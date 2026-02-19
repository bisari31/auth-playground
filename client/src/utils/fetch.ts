export const fetcher = async (url: string, init?: RequestInit) => {
  const response = await fetch(url, {
    credentials: "include",
    ...init,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "API request failed");
  }

  return data;
};
