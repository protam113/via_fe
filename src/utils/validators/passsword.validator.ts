/**
 *Check if your password is strong enough
 * @returns true if strong enough (>= 8 characters, with uppercase, lowercase, numbers, special characters)
 */
export function isStrongPassword(password: string): boolean {
  const strongRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
  return strongRegex.test(password);
}

/**
 * Generate random password
 */
export function generateRandomPassword(length = 12): string {
  const chars =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

/**
 *Verify if 2 passwords are the same (for form confirm)
 */
export function isPasswordMatch(pw: string, confirmPw: string): boolean {
  return pw === confirmPw;
}
