const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getTransactions() {
  const response = await fetch(`${API_URL}/api/transaction`);

  if (!response.ok) {
    throw new Error("Transactions could not be fetched");
  }

  return response.json();
}