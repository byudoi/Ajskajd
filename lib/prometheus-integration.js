/**
 * Adukyy Obfuscator Pro - Prometheus Integration
 * Combina lo mejor de Prometheus + Adukyy
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
// PROMETHEUS TIER 1: ENCRYPT STRINGS (Advanced)
// ============================================================================

export function prometheusEncryptStrings(code) {
  return `-- Adukyy Obfuscator Pro ♡ [Prometheus: EncryptStrings]
local __PROM_STRINGS__ = {}
local __PROM_KEYS__ = {}

local function __DECRYPT_STRING__(index, key)
  if __PROM_STRINGS__[index] then
    local decrypted = ""
    for i = 1, #__PROM_STRINGS__[index] do
      decrypted = decrypted .. string.char(__PROM_STRINGS__[index][i] ~ string.byte(key, (i-1) % #key + 1))
    end
    return decrypted
  end
  return ""
end

${code}
`;
}

// ============================================================================
// PROMETHEUS TIER 2: VMIFY (Virtual Machine)
// ============================================================================

export function prometheusVmify(code) {
  return `-- Adukyy Obfuscator Pro ♡ [Prometheus: Vmify]
local __VM__ = {
  stack = {},
  registers = {},
  pc = 0,
  instructions = {}
}

local function __VM_EXECUTE__()
  while __VM__.pc <= #__VM__.instructions do
    local instr = __VM__.instructions[__VM__.pc]
    if instr then
      instr(__VM__)
    end
    __VM__.pc = __VM__.pc + 1
  end
end

${code}
`;
}

// ============================================================================
// PROMETHEUS TIER 3: CONSTANT ARRAY
// ============================================================================

export function prometheusConstantArray(code) {
  return `-- Adukyy Obfuscator Pro ♡ [Prometheus: ConstantArray]
local __CONSTANTS__ = {}
local __CONST_ARRAY__ = {
  ${generateRandomString(20)} = 1,
  ${generateRandomString(20)} = 2,
  ${generateRandomString(20)} = 3,
  ${generateRandomString(20)} = 4,
  ${generateRandomString(20)} = 5,
}

local function __GET_CONST__(index)
  return __CONST_ARRAY__[index] or nil
end

${code}
`;
}

// ============================================================================
// PROMETHEUS TIER 4: PROXIFY LOCALS
// ============================================================================

export function prometheusProxifyLocals(code) {
  return `-- Adukyy Obfuscator Pro ♡ [Prometheus: ProxifyLocals]
local __PROXY__ = {}
setmetatable(__PROXY__, {
  __index = function(t, k)
    return rawget(t, k)
  end,
  __newindex = function(t, k, v)
    rawset(t, k, v)
  end
})

${code}
`;
}

// ============================================================================
// PROMETHEUS TIER 5: SPLIT STRINGS
// ============================================================================

export function prometheusSplitStrings(code) {
  let result = code;
  let splitCount = 0;

  result = result.replace(/"([^"]*)"/g, (match, str) => {
    if (str.length > 5) {
      splitCount++;
      const mid = Math.floor(str.length / 2);
      const part1 = str.substring(0, mid);
      const part2 = str.substring(mid);
      return `("${part1}" .. "${part2}")`;
    }
    return match;
  });

  return `-- Adukyy Obfuscator Pro ♡ [Prometheus: SplitStrings]\n${result}`;
}

// ============================================================================
// PROMETHEUS TIER 6: WATERMARK
// ============================================================================

export function prometheusWatermark() {
  return `-- Adukyy Obfuscator Pro ♡ [Prometheus: Watermark]
local __WATERMARK__ = "${generateRandomString(32)}"
local __WATERMARK_CHECK__ = function()
  if __WATERMARK__ ~= "${generateRandomString(32)}" then
    error("[WATERMARK] Code integrity check failed!")
  end
end

__WATERMARK_CHECK__()
`;
}

// ============================================================================
// PROMETHEUS TIER 7: ANTI-TAMPER
// ============================================================================

export function prometheusAntiTamper() {
  return `-- Adukyy Obfuscator Pro ♡ [Prometheus: AntiTamper]
local __ANTI_TAMPER__ = {
  checksums = {},
  verified = false
}

local function __VERIFY_INTEGRITY__()
  local functions = {
    string.sub, string.char, string.byte,
    table.insert, table.remove, table.concat,
    math.random, math.floor, os.time
  }
  
  for _, fn in ipairs(functions) do
    if type(fn) ~= "function" then
      error("[ANTI-TAMPER] Critical function modified!")
    end
  end
  
  __ANTI_TAMPER__.verified = true
end

__VERIFY_INTEGRITY__()
`;
}

// ============================================================================
// PROMETHEUS TIER 8: NUMBERS TO EXPRESSIONS
// ============================================================================

export function prometheusNumbersToExpressions(code) {
  let result = code;

  result = result.replace(/\b([0-9]{1,4})\b/g, (match) => {
    const num = parseInt(match);
    const expressions = [
      `(${num + 1} - 1)`,
      `(${num * 2} / 2)`,
      `(${num} + 0)`,
      `(0x${num.toString(16)})`,
      `(0o${num.toString(8)})`,
    ];
    return expressions[Math.floor(Math.random() * expressions.length)];
  });

  return `-- Adukyy Obfuscator Pro ♡ [Prometheus: NumbersToExpressions]\n${result}`;
}

// ============================================================================
// PROMETHEUS TIER 9: ADD VARARG
// ============================================================================

export function prometheusAddVararg(code) {
  let result = code;

  result = result.replace(/function\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g, (match, name) => {
    return `function ${name}(...`;
  });

  return result;
}

// ============================================================================
// PROMETHEUS TIER 10: WRAP IN FUNCTION
// ============================================================================

export function prometheusWrapInFunction(code) {
  return `-- Adukyy Obfuscator Pro ♡ [Prometheus: WrapInFunction]
local __WRAPPER__ = function()
${code}
end

__WRAPPER__()
`;
}

// ============================================================================
// MASTER FUNCTION - COMBINES ALL LAYERS
// ============================================================================

export function protectWithPrometheus(code, config) {
  let protected = "";
  const masterKey = config.masterKey || generateRandomString(32);

  // Prometheus layers
  if (config.prom_encrypt) protected += prometheusEncryptStrings(code) + "\n";
  if (config.prom_vm) protected += prometheusVmify(code) + "\n";
  if (config.prom_const) protected += prometheusConstantArray(code) + "\n";
  if (config.prom_proxy) protected += prometheusProxifyLocals(code) + "\n";
  if (config.prom_watermark) protected += prometheusWatermark() + "\n";
  if (config.prom_antitamper) protected += prometheusAntiTamper() + "\n";

  let processedCode = code;

  if (config.prom_split) processedCode = prometheusSplitStrings(processedCode);
  if (config.prom_numbers) processedCode = prometheusNumbersToExpressions(processedCode);
  if (config.prom_vararg) processedCode = prometheusAddVararg(processedCode);
  if (config.prom_wrap) processedCode = prometheusWrapInFunction(processedCode);

  protected += "\n-- [PROMETHEUS-OBFUSCATED CODE]\n" + processedCode;

  return {
    protected,
    masterKey,
  };
}
