export async function registerUser(data) {
  const res = await fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.error || "Registration failed");
  }

  return result;
}