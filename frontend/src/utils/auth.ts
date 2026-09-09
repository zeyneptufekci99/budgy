export function getToken() {
  return localStorage.getItem("token");
}

export function getUser() {
  const user = localStorage.getItem("user");

  if (!user) {
    return null;
  }

  return JSON.parse(user);
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}