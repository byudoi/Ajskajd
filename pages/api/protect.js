import { protectCode, analyzeCode } from "@/lib/cyphershield";
import { protectWithPrometheus } from "@/lib/prometheus-integration";
import { protectCodeHybrid } from "@/lib/hybrid-obfuscator";
import { protectForRoblox } from "@/lib/roblox-obfuscator";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { code, config, mode } = req.body;

    if (!code || typeof code !== "string") {
      return res.status(400).json({ error: "Code is required and must be a string" });
    }

    if (code.length > 5 * 1024 * 1024) {
      return res.status(413).json({ error: "Code too large (max 5MB)" });
    }

    const stats = analyzeCode(code);
    
    // Choose protection mode
    let result;
    if (mode === "roblox") {
      result = protectForRoblox(code, false);
    } else if (mode === "roblox-hybrid") {
      result = protectForRoblox(code, true);
    } else if (mode === "prometheus") {
      result = protectWithPrometheus(code, config);
    } else if (mode === "hybrid") {
      result = protectCodeHybrid(code);
    } else {
      result = protectCode(code, config);
    }

    return res.status(200).json({
      success: true,
      protected: result.protected,
      masterKey: result.masterKey,
      encryptedCount: result.encryptedCount || 0,
      executable: result.executable !== false,
      platform: result.platform || "Lua",
      mode: mode,
      stats: {
        lines: stats.lines,
        originalSize: code.length,
        protectedSize: result.protected.length,
        increase: Math.round(
          ((result.protected.length - code.length) / code.length) * 100
        ),
      },
    });
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
}
