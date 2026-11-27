/**
 * Validates Nigerian mobile phone numbers in local (080...) or +234 format.
 */
export function isValidPhone(phone: string): boolean {
  const normalized = phone.replace(/[\s()-]/g, "");
  return /^(?:0|\+?234)[789][01]\d{8}$/.test(normalized);
}

/**
 * Validates that a security PIN consists of exactly 4 numeric digits.
 */
export function isValidPin(pin: string): boolean {
  return /^\d{4}$/.test(pin);
}

/**
 * Checks whether two entered PIN strings match.
 */
export function doPinsMatch(pin: string, confirmPin: string): boolean {
  return pin === confirmPin;
}
