export function validateUserLogin({ user }) {
  const regex = /^[a-zA-Z]+$/;
  return regex.test(user);
}

export function validatePasswordLogin({ password }) {
  const regex = /^[a-zA-Z0-9]+$/;
  return regex.test(password);
}