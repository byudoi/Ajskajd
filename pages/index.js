import { useState, useRef } from "react";
import Head from "next/head";

export default function Home() {
  const [code, setCode] = useState("");
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const fileInputRef = useRef(null);

  const [config, setConfig] = useState({
    aei: true,
    ret: true,
    add: true,
    hsl: true,
    honey: true,
    cfg: true,
    str: true,
  });

  const [mode, setMode] = useState("roblox-hybrid"); // "adukyy", "prometheus", "hybrid", "roblox", "roblox-hybrid"

  const prometheusConfig = {
    prom_encrypt: true,
    prom_vm: true,
    prom_const: true,
    prom_proxy: true,
    prom_watermark: true,
    prom_antitamper: true,
    prom_split: true,
    prom_numbers: true,
    prom_vararg: true,
    prom_wrap: true,
  };

  const handleFileSelect = (file) => {
    if (!file.name.endsWith(".lua")) {
      alert("Por favor, selecciona un archivo .lua");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setCode(e.target.result);
      setFileName(file.name);
    };
    reader.readAsText(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleProtect = async () => {
    if (!code) {
      alert("Por favor, sube un archivo primero");
      return;
    }

    setLoading(true);
    try {
      const protectionConfig = mode === "prometheus" ? prometheusConfig : config;
      
      const response = await fetch("/api/protect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          code, 
          config: protectionConfig,
          mode 
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert("Error: " + data.error);
        return;
      }

      setResult(data);

      // Auto-download
      setTimeout(() => {
        downloadFile(data.protected, "protected_" + fileName);
      }, 1000);
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const downloadFile = (content, filename) => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result.masterKey);
      alert("✅ Master Key copiada");
    }
  };

  const handleReset = () => {
    setCode("");
    setFileName("");
    setResult(null);
  };

  return (
    <>
      <Head>
        <title>Adukyy Obfuscator ♡</title>
        <meta name="description" content="Protege tu código Lua con ofuscación avanzada" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='75' font-size='75'>♡</text></svg>" />
      </Head>

      <main className="container">
        <header>
          <h1>♡ Adukyy Obfuscator</h1>
          <p className="subtitle">Protege tu código Lua con ofuscación avanzada tipo Prometheus</p>
        </header>

        <section className="upload-section">
          <div
            className="upload-box"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="upload-icon">📤</div>
            <p>
              Arrastra tu archivo <code style={{ color: "#6366f1" }}>.lua</code> aquí o haz clic
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".lua"
              hidden
              onChange={(e) => {
                if (e.target.files?.length) {
                  handleFileSelect(e.target.files[0]);
                }
              }}
            />
          </div>
          {fileName && (
            <div style={{ marginTop: "1rem", padding: "1rem", background: "#1e293b", borderLeft: "4px solid #10b981", borderRadius: "8px" }}>
              <p>📄 {fileName}</p>
            </div>
          )}
        </section>

        <section className="config-section">
          <h2>⚙️ Modo de Protección</h2>
          <div style={{ marginBottom: "2rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1rem" }}>
            <label className="checkbox-label" style={{ border: mode === "roblox-hybrid" ? "2px solid #ef4444" : "2px solid transparent", padding: "1rem", borderRadius: "8px", cursor: "pointer", background: mode === "roblox-hybrid" ? "rgba(239, 68, 68, 0.1)" : "transparent" }}>
              <input
                type="radio"
                name="mode"
                value="roblox-hybrid"
                checked={mode === "roblox-hybrid"}
                onChange={(e) => setMode(e.target.value)}
                style={{ marginRight: "0.5rem" }}
              />
              <div>
                <strong>🔴 ROBLOX HYBRID ⭐</strong>
                <p style={{ fontSize: "0.85rem", color: "#cbd5e1", marginTop: "0.25rem" }}>Para Roblox/Luau (Recomendado)</p>
              </div>
            </label>
            <label className="checkbox-label" style={{ border: mode === "roblox" ? "2px solid #ef4444" : "2px solid transparent", padding: "1rem", borderRadius: "8px", cursor: "pointer" }}>
              <input
                type="radio"
                name="mode"
                value="roblox"
                checked={mode === "roblox"}
                onChange={(e) => setMode(e.target.value)}
                style={{ marginRight: "0.5rem" }}
              />
              <div>
                <strong>🔴 ROBLOX</strong>
                <p style={{ fontSize: "0.85rem", color: "#cbd5e1", marginTop: "0.25rem" }}>Compatible con Luau</p>
              </div>
            </label>
            <label className="checkbox-label" style={{ border: mode === "hybrid" ? "2px solid #10b981" : "2px solid transparent", padding: "1rem", borderRadius: "8px", cursor: "pointer" }}>
              <input
                type="radio"
                name="mode"
                value="hybrid"
                checked={mode === "hybrid"}
                onChange={(e) => setMode(e.target.value)}
                style={{ marginRight: "0.5rem" }}
              />
              <div>
                <strong>🔥 HYBRID</strong>
                <p style={{ fontSize: "0.85rem", color: "#cbd5e1", marginTop: "0.25rem" }}>Lua genérico</p>
              </div>
            </label>
            <label className="checkbox-label" style={{ border: mode === "adukyy" ? "2px solid #6366f1" : "2px solid transparent", padding: "1rem", borderRadius: "8px", cursor: "pointer" }}>
              <input
                type="radio"
                name="mode"
                value="adukyy"
                checked={mode === "adukyy"}
                onChange={(e) => setMode(e.target.value)}
                style={{ marginRight: "0.5rem" }}
              />
              <div>
                <strong>♡ Adukyy</strong>
                <p style={{ fontSize: "0.85rem", color: "#cbd5e1", marginTop: "0.25rem" }}>16 capas</p>
              </div>
            </label>
            <label className="checkbox-label" style={{ border: mode === "prometheus" ? "2px solid #6366f1" : "2px solid transparent", padding: "1rem", borderRadius: "8px", cursor: "pointer" }}>
              <input
                type="radio"
                name="mode"
                value="prometheus"
                checked={mode === "prometheus"}
                onChange={(e) => setMode(e.target.value)}
                style={{ marginRight: "0.5rem" }}
              />
              <div>
                <strong>⚡ Prometheus</strong>
                <p style={{ fontSize: "0.85rem", color: "#cbd5e1", marginTop: "0.25rem" }}>10 capas</p>
              </div>
            </label>
          </div>

          <h2>⚙️ Configuración</h2>
          <div className="config-grid">
            {mode.includes("roblox") ? (
              <div style={{ gridColumn: "1 / -1", padding: "1rem", background: "rgba(239, 68, 68, 0.1)", borderLeft: "4px solid #ef4444", borderRadius: "8px" }}>
                <p style={{ color: "#ef4444", fontWeight: "bold" }}>🔴 ROBLOX/LUAU MODE</p>
                <p style={{ fontSize: "0.9rem", color: "#cbd5e1", marginTop: "0.5rem" }}>Optimizado para scripts de Roblox</p>
                <p style={{ fontSize: "0.85rem", color: "#94a3b8", marginTop: "0.25rem" }}>✅ Compatible con LocalScript, ModuleScript, Script</p>
                <p style={{ fontSize: "0.85rem", color: "#94a3b8" }}>✅ Funciona con Luau (Motor de Roblox)</p>
                <p style={{ fontSize: "0.85rem", color: "#94a3b8" }}>✅ Detección de decompiladores específica de Roblox</p>
                <p style={{ fontSize: "0.85rem", color: "#94a3b8" }}>✅ Verificación de integridad de GameId</p>
                {mode === "roblox-hybrid" && (
                  <p style={{ fontSize: "0.85rem", color: "#10b981", marginTop: "0.25rem" }}>⭐ Máxima protección: Roblox + Adukyy combinados</p>
                )}
              </div>
            ) : mode === "hybrid" ? (
              <div style={{ gridColumn: "1 / -1", padding: "1rem", background: "#1e293b", borderLeft: "4px solid #10b981", borderRadius: "8px" }}>
                <p style={{ color: "#10b981", fontWeight: "bold" }}>✅ HYBRID MODE ACTIVO</p>
                <p style={{ fontSize: "0.9rem", color: "#cbd5e1", marginTop: "0.5rem" }}>Combinación automática de Adukyy + Prometheus</p>
                <p style={{ fontSize: "0.85rem", color: "#94a3b8", marginTop: "0.25rem" }}>• 8 capas integradas</p>
                <p style={{ fontSize: "0.85rem", color: "#94a3b8" }}>• 100% ejecutable en Lua</p>
              </div>
            ) : mode === "adukyy" ? (
              <>
                {[
                  { id: "aei", label: "Anti-Environment Logger" },
                  { id: "ret", label: "Runtime Event Tracer" },
                  { id: "add", label: "Advanced Dumper Detection" },
                  { id: "hsl", label: "Hook Suppression Layer" },
                  { id: "honey", label: "Honeypot Functions" },
                  { id: "cfg", label: "Control Flow Fragmentation" },
                  { id: "str", label: "String Encryption UTF-32" },
                ].map((layer) => (
                  <label key={layer.id} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={config[layer.id]}
                      onChange={(e) => setConfig({ ...config, [layer.id]: e.target.checked })}
                    />
                    <span>{layer.label}</span>
                  </label>
                ))}
              </>
            ) : (
              <>
                {[
                  { id: "prom_encrypt", label: "Encrypt Strings" },
                  { id: "prom_vm", label: "Vmify (VM)" },
                  { id: "prom_const", label: "Constant Array" },
                  { id: "prom_proxy", label: "Proxify Locals" },
                  { id: "prom_watermark", label: "Watermark" },
                  { id: "prom_antitamper", label: "Anti-Tamper" },
                  { id: "prom_split", label: "Split Strings" },
                  { id: "prom_numbers", label: "Numbers to Expressions" },
                  { id: "prom_vararg", label: "Add Vararg" },
                  { id: "prom_wrap", label: "Wrap in Function" },
                ].map((layer) => (
                  <label key={layer.id} className="checkbox-label">
                    <input type="checkbox" defaultChecked />
                    <span>{layer.label}</span>
                  </label>
                ))}
              </>
            )}
          </div>
        </section>

        <section className="button-section">
          <button className="btn-primary" onClick={handleProtect} disabled={!code || loading}>
            {loading ? "⏳ Procesando..." : "✅ Proteger Script"}
          </button>
          <button className="btn-secondary" onClick={handleReset}>
            🔄 Reiniciar
          </button>
        </section>

        {result && (
          <section className="result-section">
            <h2>✨ Resultado</h2>

            {result.platform === "Roblox/Luau" && (
              <div style={{ background: "rgba(239, 68, 68, 0.1)", borderLeft: "4px solid #ef4444", padding: "1rem", borderRadius: "8px", marginBottom: "2rem" }}>
                <p style={{ color: "#ef4444", fontWeight: "bold" }}>🔴 ROBLOX/LUAU LISTO</p>
                <p style={{ fontSize: "0.9rem", color: "#cbd5e1", marginTop: "0.5rem" }}>✅ Script optimizado para Roblox</p>
                <p style={{ fontSize: "0.85rem", color: "#cbd5e1", marginTop: "0.25rem" }}>📋 Compatible con: LocalScript, ModuleScript, Script</p>
                <p style={{ fontSize: "0.85rem", color: "#cbd5e1" }}>🔐 Protecciones Roblox: GameId, Integridad, Anti-Clone</p>
                <p style={{ fontSize: "0.85rem", color: "#cbd5e1" }}>⚡ Motor: Luau (Runtime de Roblox)</p>
              </div>
            )}

            {result.executable && (
              <div style={{ background: "rgba(16, 185, 129, 0.1)", borderLeft: "4px solid #10b981", padding: "1rem", borderRadius: "8px", marginBottom: "2rem" }}>
                <p style={{ color: "#10b981", fontWeight: "bold" }}>✅ CÓDIGO 100% EJECUTABLE</p>
                <p style={{ fontSize: "0.9rem", color: "#cbd5e1", marginTop: "0.5rem" }}>Este código está listo para ejecutar {result.platform === "Roblox/Luau" ? "en Roblox" : "en Lua"} y es funcionalmente equivalente al original.</p>
              </div>
            )}

            <div className="result-card">
              <h3>Master Key</h3>
              <div className="key-display">
                <span>{result.masterKey}</span>
              </div>
              <button
                className="btn-secondary"
                onClick={copyToClipboard}
                style={{ marginTop: "1rem" }}
              >
                📋 Copiar Key
              </button>
              <p className="warning" style={{ marginTop: "1rem" }}>
                ⚠️ Guarda esta clave en un lugar seguro. La necesitas para descifrar las strings.
              </p>
            </div>

            <div className="result-card">
              <h3>Script Protegido</h3>
              <p>El archivo se descargó automáticamente.</p>
              <button
                className="btn-primary"
                onClick={() => downloadFile(result.protected, "protected_" + fileName)}
              >
                💾 Descargar de Nuevo
              </button>
            </div>

            <div className="result-stats">
              <div className="stat">
                <span className="stat-label">Líneas</span>
                <span className="stat-value">{result.stats.lines}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Original</span>
                <span className="stat-value">{formatBytes(result.stats.originalSize)}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Protegido</span>
                <span className="stat-value">{formatBytes(result.stats.protectedSize)}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Incremento</span>
                <span className="stat-value">{result.stats.increase}%</span>
              </div>
            </div>
          </section>
        )}

        <section style={{ marginTop: "4rem", textAlign: "center", color: "#cbd5e1" }}>
          <p>🛡️ CypherShield Vercel | Procesamiento en la nube</p>
          <p style={{ fontSize: "0.9rem", marginTop: "0.5rem" }}>100% privado • Sin logs • Instantáneo</p>
        </section>
      </main>
    </>
  );
}

function formatBytes(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
}
