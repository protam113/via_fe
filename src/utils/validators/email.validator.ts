/**
 * Kiểm tra xem một chuỗi có phải email hợp lệ không
 */
export function isValidEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Ẩn email thành dạng bảo mật (ví dụ: h***@gmail.com)
 */
export function maskEmail(email: string): string {
  const [username, domain] = email.split('@');
  if (!username || !domain) return email;

  const maskedUser =
    username[0] +
    '*'.repeat(Math.max(username.length - 2, 1)) +
    username.slice(-1);
  return `${maskedUser}@${domain}`;
}
