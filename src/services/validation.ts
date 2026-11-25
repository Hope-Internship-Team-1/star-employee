export const PASSWORD_MIN = 8;
export const PASSWORD_MAX = 72;

export function isPasswordLengthValid(password: string): boolean {
  return password.length >= PASSWORD_MIN && password.length <= PASSWORD_MAX;
}

export function passwordsMatch(password: string, confirmation: string): boolean {
  return password === confirmation;
}
