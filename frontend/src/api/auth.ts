const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type LoginData = {
  email: string;
  password: string;
};

export async function login(data: LoginData) {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Invalid email or password.");
  }

  return response.json();
}

export type RegisterData = {
  name: string;
  email: string;
  password: string;
};

export async function register(data: RegisterData) {
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Registration failed.");
  }

  return response.json();
}