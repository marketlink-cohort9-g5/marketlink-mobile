// EMAIL VALIDATION
export const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
};

// NIGERIAN PHONE NUMBER VALIDATION
export const isValidPhone = (phone: string): boolean => {
  const cleanedPhone = phone.replace(/\s+/g, "");
  return /^(\+234|234|0)[789][01]\d{8}$/.test(cleanedPhone);
};

// FOUR-DIGIT PIN VALIDATION
export const isValidPin = (pin: string): boolean => {
  return /^\d{4}$/.test(pin);
};

// PIN CONFIRMATION
export const doPinsMatch = (pin: string, confirmPin: string): boolean => {
  return pin === confirmPin;
};

// PASSWORD VALIDATION
export const isValidPassword = (password: string): boolean => {
  return password.length >= 8;
};

// QUANTITY VALIDATION
export const isValidQuantity = (quantity: number): boolean => {
  return Number.isInteger(quantity) && quantity > 0;
};

// PRICE VALIDATION
export const isValidPrice = (price: number): boolean => {
  return Number.isFinite(price) && price > 0;
};

// MINIMUM ORDER QUANTITY VALIDATION
export const isValidMOQ = (moq: number): boolean => {
  return Number.isInteger(moq) && moq > 0;
};

// REQUIRED FIELD VALIDATION
export const isRequired = (value: string): boolean => {
  return value.trim().length > 0;
};
