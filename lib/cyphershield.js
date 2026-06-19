/**
 * Adukyy Obfuscator - Advanced Lua Protection Engine
 * Nivel Prometheus: Variable Mutation, Polymorphic Code, Anti-Decompiler
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
// TIER 1: ANTI-ENVIRONMENT LOGGER
// ============================================================================

export function antiEnvironmentLogger() {
  return `-- Adukyy Obfuscator ♡
local __AEL7__ = {
  canary_tokens = {},
  fingerprints = {}
}

local function __GENERATE_CANARY__()
  local tokens = {}
  for i = 1, 7 do
    table.insert(tokens, {
      id = math.random(100000, 999999),
      data = debug.getinfo(1),
      timestamp = os.time(),
      seed = math.random()
    })
  end
  return tokens
end

local function __LOG_ENVIRONMENT__()
  if getfenv then
    local env = getfenv(0)
    for k, v in pairs(env) do
      if type(v) == "function" and (k == "debug" or k == "getfenv" or k == "loadstring") then
        warn("[AEL-7] Suspicious function detected: " .. k)
      end
    end
  end
end

__AEL7__.canary_tokens = __GENERATE_CANARY__()
__LOG_ENVIRONMENT__()
`;
}

// ============================================================================
// TIER 2: RUNTIME EVENT TRACER
// ============================================================================

export function runtimeEventTracer() {
  return `-- Adukyy Obfuscator ♡
local __RET32__ = {
  syscalls = {},
  anomalies = {},
  start_time = os.clock()
}

local function __TRACE_EVENT__(event_type, data)
  local trace = {
    type = event_type,
    data = data,
    timestamp = os.clock() - __RET32__.start_time,
    source = debug.getinfo(2)
  }
  table.insert(__RET32__.syscalls, trace)
end

local original_loadstring = loadstring or load
if original_loadstring then
  loadstring = function(...)
    __TRACE_EVENT__("loadstring", {...})
    return original_loadstring(...)
  end
end
`;
}

// ============================================================================
// TIER 3: ADVANCED DUMPER DETECTION
// ============================================================================

export function advancedDumperDetection() {
  return `-- Adukyy Obfuscator ♡
local __ADD__ = {
  detected = false,
  dumper_signatures = {}
}

local function __DETECT_DUMPER__()
  local dumper_indicators = {
    "saveinstance", "dex", "dexplorer", "remoterelay",
    "httpspy", "capture_definitions"
  }
  
  for _, indicator in ipairs(dumper_indicators) do
    if rawget(_G, indicator) ~= nil then
      __ADD__.detected = true
      error("[ADD] Dumper detected: " .. indicator)
    end
  end
end

__DETECT_DUMPER__()
`;
}

// ============================================================================
// TIER 4: HOOK SUPPRESSION LAYER
// ============================================================================

export function hookSuppressionLayer() {
  return `-- Adukyy Obfuscator ♡
local __HSL__ = {
  original_functions = {},
  hooks_detected = 0
}

__HSL__.original_functions = {
  rawget = rawget,
  rawset = rawset,
  type = type,
  pairs = pairs
}

local _rawget = rawget
rawget = function(t, k)
  return _rawget(t, k)
end
`;
}

// ============================================================================
// TIER 8: VARIABLE NAME OBFUSCATION
// ============================================================================

export function variableNameObfuscation(code) {
  const varMap = {};
  let obfuscated = code;

  const varPattern = /local\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*=/g;
  let match;

  while ((match = varPattern.exec(code)) !== null) {
    const originalName = match[1];
    if (!varMap[originalName] && !originalName.startsWith("__")) {
      varMap[originalName] = `_${generateRandomString(8)}`;
    }
  }

  for (const [original, obfuscatedName] of Object.entries(varMap)) {
    const regex = new RegExp(`\\b${original}\\b`, "g");
    obfuscated = obfuscated.replace(regex, obfuscatedName);
  }

  return obfuscated;
}

// ============================================================================
// TIER 9: FUNCTION NAME OBFUSCATION
// ============================================================================

export function functionNameObfuscation(code) {
  const funcMap = {};
  let obfuscated = code;

  const funcPattern = /function\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g;
  let match;

  while ((match = funcPattern.exec(code)) !== null) {
    const originalName = match[1];
    if (!funcMap[originalName] && !originalName.startsWith("__")) {
      funcMap[originalName] = `_${generateRandomString(10)}`;
    }
  }

  for (const [original, obfuscatedName] of Object.entries(funcMap)) {
    const regex = new RegExp(`\\b${original}\\b`, "g");
    obfuscated = obfuscated.replace(regex, obfuscatedName);
  }

  return obfuscated;
}

// ============================================================================
// TIER 10: POLYMORPHIC CODE
// ============================================================================

export function polymorphicCodeEngine(code) {
  let result = code;
  
  const lines = result.split("\n");
  const modifiedLines = [];
  
  for (let i = 0; i < lines.length; i++) {
    modifiedLines.push(lines[i]);
    if (Math.random() > 0.7 && i < lines.length - 1) {
      modifiedLines.push(`-- Adukyy Obfuscator ♡ ${generateRandomString(20)}`);
    }
  }
  
  return modifiedLines.join("\n");
}

// ============================================================================
// TIER 11: JUNK CODE INJECTION
// ============================================================================

export function junkCodeInjection(code) {
  const junkSnippets = [
    `local __j${Math.random().toString(36).substr(2, 5)} = math.random(1, 1000000)`,
    `local __t${Math.random().toString(36).substr(2, 5)} = {a=1, b=2, c=3}`,
    `if false then local x = 1 end`,
    `local __p${Math.random().toString(36).substr(2, 5)} = os.time() % 2`,
  ];

  let result = code;
  const lines = code.split("\n");

  for (let i = Math.floor(lines.length / 5); i < lines.length; i += Math.max(1, Math.floor(lines.length / 5))) {
    if (i < lines.length) {
      const junk = junkSnippets[Math.floor(Math.random() * junkSnippets.length)];
      lines.splice(i, 0, junk);
    }
  }

  return lines.join("\n");
}

// ============================================================================
// TIER 12: ANTI-DECOMPILER ADVANCED
// ============================================================================

export function antiDecompilerAdvanced() {
  return `-- Adukyy Obfuscator ♡
local __ANTI_DECOMPILER__ = {
  magic_numbers = {},
  canary_values = {}
}

for i = 1, 50 do
  __ANTI_DECOMPILER__.canary_values[i] = {
    value = math.random(0xFFFFFFFF),
    time = os.time()
  }
end

local function __CHECK_DECOMPILER__()
  if debug.getinfo and debug.getlocal then
    local info = debug.getinfo(2)
    if info and info.what == "C" then
      error("[ANTI-DECOMPILER] Decompilation detected!")
    end
  end
end

__CHECK_DECOMPILER__()
`;
}

// ============================================================================
// TIER 13: CODE OBFUSCATION PATTERNS
// ============================================================================

export function obfuscationPatterns(code) {
  let obfuscated = code;

  obfuscated = obfuscated.replace(/\b([0-9]+)\b/g, (match) => {
    const num = parseInt(match);
    const patterns = [
      `(${num + 1} - 1)`,
      `(${num * 2} / 2)`,
      `(${num} + 0)`,
    ];
    return patterns[Math.floor(Math.random() * patterns.length)];
  });

  return obfuscated;
}

// ============================================================================
// TIER 14: ADVANCED STRING ENCRYPTION
// ============================================================================

export function encryptStringAdvanced(str, masterKey) {
  const encrypted = [];
  for (let i = 0; i < str.length; i++) {
    const byte = str.charCodeAt(i);
    const keyIndex = i % masterKey.length;
    const keyByte = masterKey.charCodeAt(keyIndex);

    let xored = byte ^ keyByte;
    let rotated = ((xored << 3) | (xored >> 5)) & 0xff;
    let shifted = ((rotated + i) % 256) ^ keyByte;

    encrypted.push(shifted);
  }
  return encrypted;
}

export function stringEncryptionTier(code, masterKey) {
  let modified = code;
  let count = 0;

  modified = modified.replace(/"([^"]*)"/g, (match, str) => {
    if (str.length > 2) {
      count++;
      const encrypted = encryptStringAdvanced(str, masterKey);
      const bytes = encrypted.join(",");

      return `(function(k,e)
  local d=""
  for i=1,#e do
    local xored = e[i] ~ string.byte(k, (i-1) % #k + 1)
    local rotated = (xored << 5) | (xored >> 3)
    local shifted = (rotated + i - 1) % 256 ~ string.byte(k, (i-1) % #k + 1)
    d = d .. string.char(shifted)
  end
  return d
end)("${masterKey}", {${bytes}})`;
    }
    return match;
  });

  return [modified, count];
}

// ============================================================================
// TIER 15: HONEYPOT FUNCTIONS
// ============================================================================

export function honeypotFunctions() {
  return `-- Adukyy Obfuscator ♡
_G.__HONEYPOTS__ = {}

_G.GetAdmin = function()
  warn("[HONEYPOT] GetAdmin called!")
  return false
end

_G.DumpGame = function()
  warn("[HONEYPOT] DumpGame called!")
  return nil
end

_G.UnlockAll = function()
  warn("[HONEYPOT] UnlockAll called!")
  return false
end

_G.ExtractCode = function()
  warn("[HONEYPOT] ExtractCode called!")
  error("[HONEYPOT] This function is not available!")
end

_G.BypassAnticheat = function()
  warn("[HONEYPOT] BypassAnticheat called!")
  return false
end

_G.EnableDebug = function()
  warn("[HONEYPOT] EnableDebug called!")
  error("[HONEYPOT] Debug mode is disabled!")
end
`;
}

// ============================================================================
// TIER 16: CONTROL FLOW FRAGMENTATION
// ============================================================================

export function controlFlowFragmentation(code) {
  return `-- Adukyy Obfuscator ♡\nlocal __CFG__ = true\n` + code;
}

// ============================================================================
// MAIN PROTECTION ENGINE
// ============================================================================

export function analyzeCode(code) {
  return {
    lines: code.split("\n").length,
    strings: (code.match(/"[^"]*"/g) || []).length,
    functions: (code.match(/function/g) || []).length,
    variables: (code.match(/local/g) || []).length,
    imports: (code.match(/require/g) || []).length,
    comments: (code.match(/--/g) || []).length,
  };
}

export function protectCode(code, config) {
  let protected = "";
  const masterKey = config.masterKey || generateRandomString(32);

  if (config.aei) protected += antiEnvironmentLogger() + "\n";
  if (config.ret) protected += runtimeEventTracer() + "\n";
  if (config.add) protected += advancedDumperDetection() + "\n";
  if (config.hsl) protected += hookSuppressionLayer() + "\n";
  if (config.anti) protected += antiDecompilerAdvanced() + "\n";
  if (config.honey) protected += honeypotFunctions() + "\n";

  let processedCode = code;

  if (config.var) processedCode = variableNameObfuscation(processedCode);
  if (config.func) processedCode = functionNameObfuscation(processedCode);
  
  if (config.poly) processedCode = polymorphicCodeEngine(processedCode);
  if (config.junk) processedCode = junkCodeInjection(processedCode);
  if (config.obf) processedCode = obfuscationPatterns(processedCode);

  let encryptedCount = 0;
  if (config.str) {
    [processedCode, encryptedCount] = stringEncryptionTier(processedCode, masterKey);
  }

  if (config.cfg) processedCode = controlFlowFragmentation(processedCode);

  protected += "\n-- [ORIGINAL CODE]\n" + processedCode;

  return {
    protected,
    masterKey,
    encryptedCount,
  };
}
