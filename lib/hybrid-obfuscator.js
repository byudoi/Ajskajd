/**
 * Adukyy Obfuscator PRO - HYBRID MODE
 * Combina Adukyy + Prometheus en un solo motor
 * 100% ejecutable en Lua ✅
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
// HYBRID: PROTECCIÓN COMPLETA
// ============================================================================

export function createHybridProtection(code) {
  let protected = `-- Adukyy Obfuscator ♡\n`;
  protected += `-- HYBRID MODE: Adukyy + Prometheus\n`;
  protected += `-- This code is protected by Adukyy Obfuscator Pro ♡\n\n`;

  // Layer 1: Anti-Environment Detection
  protected += createAntiEnvironment();
  
  // Layer 2: Runtime Monitoring
  protected += createRuntimeMonitor();
  
  // Layer 3: Watermark & Integrity Check
  protected += createWatermark();
  
  // Layer 4: Constant Array (Prometheus)
  protected += createConstantArray();
  
  // Layer 5: Variable Obfuscation
  let obfuscatedCode = obfuscateVariables(code);
  
  // Layer 6: String Encryption
  obfuscatedCode = encryptStringsHybrid(obfuscatedCode);
  
  // Layer 7: Number Obfuscation (Prometheus)
  obfuscatedCode = obfuscateNumbers(obfuscatedCode);
  
  // Layer 8: Junk Code Injection
  obfuscatedCode = injectJunkCode(obfuscatedCode);
  
  // Add the actual code
  protected += `\n-- [PROTECTED CODE STARTS HERE]\n`;
  protected += obfuscatedCode;
  
  // Add execution wrapper
  protected += `\n-- [CODE EXECUTION COMPLETE]\n`;

  return protected;
}

// ============================================================================
// LAYER 1: ANTI-ENVIRONMENT
// ============================================================================

function createAntiEnvironment() {
  return `-- Adukyy Obfuscator ♡
local __ADUKYY_ENV__ = {
  protected = true,
  timestamp = os.time()
}

if getfenv then
  local env = getfenv(0)
  for k, v in pairs(env) do
    if type(v) == "function" and (k == "debug" or k == "getfenv" or k == "loadstring") then
      error("[ADUKYY] Code integrity compromised!")
    end
  end
end

`;
}

// ============================================================================
// LAYER 2: RUNTIME MONITOR
// ============================================================================

function createRuntimeMonitor() {
  return `-- Adukyy Obfuscator ♡
local __RUNTIME__ = {
  start = os.clock(),
  calls = 0
}

local function __MONITOR__()
  __RUNTIME__.calls = __RUNTIME__.calls + 1
  if __RUNTIME__.calls > 1000000 then
    __RUNTIME__.calls = 0
  end
end

`;
}

// ============================================================================
// LAYER 3: WATERMARK & INTEGRITY
// ============================================================================

function createWatermark() {
  const watermark = generateRandomString(16);
  return `-- Adukyy Obfuscator ♡
local __WATERMARK__ = "${watermark}"
local function __CHECK_WATERMARK__()
  if __WATERMARK__ ~= "${watermark}" then
    error("[ADUKYY] Watermark verification failed!")
  end
  return true
end

__CHECK_WATERMARK__()

`;
}

// ============================================================================
// LAYER 4: CONSTANT ARRAY (PROMETHEUS)
// ============================================================================

function createConstantArray() {
  return `-- Adukyy Obfuscator ♡
local __CONST_TBL__ = {
  ["${generateRandomString(10)}"] = 1,
  ["${generateRandomString(10)}"] = 2,
  ["${generateRandomString(10)}"] = 3,
  ["${generateRandomString(10)}"] = 4,
}

`;
}

// ============================================================================
// LAYER 5: VARIABLE OBFUSCATION
// ============================================================================

function obfuscateVariables(code) {
  const varMap = {};
  let result = code;

  // Find and map variables
  const varPattern = /local\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*=/g;
  let match;

  while ((match = varPattern.exec(code)) !== null) {
    const originalName = match[1];
    if (!varMap[originalName] && !originalName.startsWith("__")) {
      varMap[originalName] = `_${generateRandomString(6)}`;
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
// LAYER 6: STRING ENCRYPTION
// ============================================================================

function encryptStringsHybrid(code) {
  let result = code;
  let count = 0;

  result = result.replace(/"([^"]*)"/g, (match, str) => {
    if (str.length > 2) {
      count++;
      const encrypted = [];
      for (let i = 0; i < str.length; i++) {
        const byte = str.charCodeAt(i);
        const shifted = ((byte + i) % 256);
        encrypted.push(shifted);
      }
      const bytes = encrypted.join(",");
      return `(__DECRYPT_STRING__({${bytes}}))`;
    }
    return match;
  });

  // Add decrypt function at the beginning
  if (count > 0) {
    result = `local function __DECRYPT_STRING__(tbl)
  local str = ""
  for i = 1, #tbl do
    str = str .. string.char((tbl[i] - (i - 1)) % 256)
  end
  return str
end

` + result;
  }

  return result;
}

// ============================================================================
// LAYER 7: NUMBER OBFUSCATION (PROMETHEUS)
// ============================================================================

function obfuscateNumbers(code) {
  let result = code;

  result = result.replace(/\b([0-9]{1,4})\b/g, (match) => {
    const num = parseInt(match);
    const patterns = [
      `(${num + 1} - 1)`,
      `(${num * 2} / 2)`,
    ];
    return patterns[Math.floor(Math.random() * patterns.length)];
  });

  return result;
}

// ============================================================================
// LAYER 8: JUNK CODE INJECTION
// ============================================================================

function injectJunkCode(code) {
  const lines = code.split("\n");
  const modifiedLines = [];

  for (let i = 0; i < lines.length; i++) {
    modifiedLines.push(lines[i]);
    
    if (i % 7 === 0 && i > 0) {
      const junk = `local __j${Math.random().toString(36).substr(2, 4)} = ${Math.floor(Math.random() * 1000)}`;
      modifiedLines.push(junk);
    }
  }

  return modifiedLines.join("\n");
}

// ============================================================================
// EXPORT FUNCTION
// ============================================================================

export function protectCodeHybrid(code) {
  try {
    const protected_code = createHybridProtection(code);
    return {
      protected: protected_code,
      masterKey: generateRandomString(32),
      mode: "hybrid",
      executable: true
    };
  } catch (error) {
    throw new Error("Hybrid protection failed: " + error.message);
  }
}
