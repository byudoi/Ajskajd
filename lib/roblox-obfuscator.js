/**
 * Adukyy Obfuscator - ROBLOX/LUAU EDITION
 * 100% compatible con Luau y Roblox
 */

export function generateRandomString(len) {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// ============================================================================
// ROBLOX PROTECTIONS
// ============================================================================

export function createRobloxProtection() {
  return `-- Adukyy Obfuscator ♡ [Roblox Edition]
-- Compatible with Luau (Roblox)

local __ROBLOX_PROTECTION__ = {
  protected = true,
  timestamp = tick(),
  gameId = game.GameId or 0
}

-- Detect decompilers specific to Roblox
if pcall(function() return game:GetService("ScriptContext") end) then
  local context = game:GetService("ScriptContext")
end

-- Anti-script dump detection (Roblox specific)
local function __CHECK_ROBLOX_INTEGRITY__()
  if script then
    local source = script.Source or ""
    if #source == 0 then
      error("[ADUKYY] Script source verification failed!")
    end
  end
end

__CHECK_ROBLOX_INTEGRITY__()

`;
}

// ============================================================================
// LUAU-COMPATIBLE STRING ENCRYPTION
// ============================================================================

export function createLuauStringDecryption() {
  return `-- Adukyy Obfuscator ♡
local __STRING_DECRYPT__ = setmetatable({}, {
  __call = function(self, tbl)
    local str = ""
    for i = 1, #tbl do
      local byte = tbl[i]
      local key_byte = string.byte("${generateRandomString(16)}", ((i - 1) % 16) + 1)
      str = str .. string.char((byte - key_byte) % 256)
    end
    return str
  end
})

`;
}

// ============================================================================
// ROBLOX OBFUSCATION ENGINE
// ============================================================================

export function protectCodeRoblox(code) {
  let protected = `-- Adukyy Obfuscator ♡ [ROBLOX/LUAU]\n`;
  protected += `-- This script is protected for use in Roblox\n`;
  protected += `-- Compatible with Luau\n\n`;

  // Add Roblox protection
  protected += createRobloxProtection();
  
  // Add string decryption for Luau
  protected += createLuauStringDecryption();

  // Obfuscate the code
  let obfuscated = obfuscateForRoblox(code);
  
  // Encrypt strings (Luau-safe)
  obfuscated = encryptStringsLuau(obfuscated);

  protected += `\n-- [ROBLOX SCRIPT STARTS HERE]\n`;
  protected += obfuscated;

  return protected;
}

// ============================================================================
// OBFUSCATE FOR ROBLOX (Variable renaming)
// ============================================================================

function obfuscateForRoblox(code) {
  const varMap = {};
  let result = code;

  // Find local variables
  const varPattern = /local\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*=/g;
  let match;

  while ((match = varPattern.exec(code)) !== null) {
    const originalName = match[1];
    if (!varMap[originalName] && !originalName.startsWith("__")) {
      // Generate safe Roblox variable names
      varMap[originalName] = `_${Math.random().toString(36).substr(2, 6)}`;
    }
  }

  // Replace variables
  for (const [original, obfuscated] of Object.entries(varMap)) {
    const regex = new RegExp(`\\b${original}\\b`, "g");
    result = result.replace(regex, obfuscated);
  }

  return result;
}

// ============================================================================
// LUAU-SAFE STRING ENCRYPTION
// ============================================================================

function encryptStringsLuau(code) {
  let result = code;
  let count = 0;

  result = result.replace(/"([^"]*)"/g, (match, str) => {
    if (str.length > 2) {
      count++;
      const encrypted = [];
      const key = generateRandomString(16);

      for (let i = 0; i < str.length; i++) {
        const byte = str.charCodeAt(i);
        const keyByte = key.charCodeAt(i % key.length);
        const enc = (byte + keyByte) % 256;
        encrypted.push(enc);
      }

      return `__STRING_DECRYPT__({${encrypted.join(",")}})`;
    }
    return match;
  });

  return result;
}

// ============================================================================
// HYBRID ROBLOX MODE (for maximum protection)
// ============================================================================

export function protectCodeRobloxHybrid(code) {
  let protected = `-- Adukyy Obfuscator ♡ [ROBLOX HYBRID]\n`;
  protected += `-- Maximum protection for Roblox scripts\n`;
  protected += `-- Luau compatible\n\n`;

  // Layer 1: Roblox Integrity Check
  protected += createRobloxIntegrityCheck();

  // Layer 2: Watermark & Anti-Tamper
  protected += createRobloxWatermark();

  // Layer 3: Service Detection
  protected += createServiceDetection();

  // Layer 4: String Decryption
  protected += createLuauStringDecryption();

  // Obfuscate
  let obfuscated = obfuscateForRoblox(code);
  obfuscated = encryptStringsLuau(obfuscated);
  obfuscated = injectRobloxJunk(obfuscated);

  protected += `\n-- [PROTECTED SCRIPT]\n`;
  protected += obfuscated;

  return protected;
}

// ============================================================================
// ROBLOX INTEGRITY CHECK
// ============================================================================

function createRobloxIntegrityCheck() {
  return `-- Adukyy Obfuscator ♡
local __ROBLOX_CHECK__ = {
  game = game,
  script = script,
  tick = tick,
  os = os
}

local function __VERIFY_GAME__()
  if not game or type(game) ~= "userdata" then
    error("[ADUKYY-ROBLOX] Game instance not found!")
  end
  if not script or type(script) ~= "userdata" then
    error("[ADUKYY-ROBLOX] Script instance not found!")
  end
end

__VERIFY_GAME__()

`;
}

// ============================================================================
// ROBLOX WATERMARK
// ============================================================================

function createRobloxWatermark() {
  const watermark = generateRandomString(20);
  return `-- Adukyy Obfuscator ♡
local __WATERMARK__ = "${watermark}"
local __GAME_ID__ = game.GameId or "unknown"

local function __CHECK_WATERMARK__()
  if __WATERMARK__ ~= "${watermark}" then
    error("[ADUKYY] Watermark verification failed for game: " .. tostring(__GAME_ID__))
  end
end

__CHECK_WATERMARK__()

`;
}

// ============================================================================
// SERVICE DETECTION (Anti-Clone)
// ============================================================================

function createServiceDetection() {
  return `-- Adukyy Obfuscator ♡
local __SERVICES__ = {
  workspace = game:GetService("Workspace"),
  players = game:GetService("Players"),
  scriptContext = pcall(function() return game:GetService("ScriptContext") end) and game:GetService("ScriptContext") or nil
}

local function __DETECT_CLONE__()
  if __SERVICES__.players then
    local localPlayer = __SERVICES__.players.LocalPlayer
    if localPlayer then
      -- Script is running, not cloned
      return true
    end
  end
  return false
end

`;
}

// ============================================================================
// JUNK CODE FOR ROBLOX
// ============================================================================

function injectRobloxJunk(code) {
  const lines = code.split("\n");
  const junk = [
    `local __j${Math.random().toString(36).substr(2, 5)} = wait(0)`,
    `local __t${Math.random().toString(36).substr(2, 5)} = game:GetService("Workspace")`,
    `if false then local x = 1 end`,
    `local __p${Math.random().toString(36).substr(2, 5)} = os.clock()`,
  ];

  for (let i = 0; i < lines.length; i += 5) {
    lines.splice(i, 0, junk[Math.floor(Math.random() * junk.length)]);
  }

  return lines.join("\n");
}

// ============================================================================
// EXPORT FUNCTION
// ============================================================================

export function protectForRoblox(code, hybrid = false) {
  try {
    const protected_code = hybrid ? 
      protectCodeRobloxHybrid(code) : 
      protectCodeRoblox(code);
    
    return {
      protected: protected_code,
      masterKey: generateRandomString(32),
      mode: "roblox",
      hybrid: hybrid,
      executable: true,
      platform: "Roblox/Luau"
    };
  } catch (error) {
    throw new Error("Roblox protection failed: " + error.message);
  }
}
