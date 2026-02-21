const SERVER_URL = "http://localhost:4000/api";

let refreshPromise: Promise<string | null> | null = null;

const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const res = await fetch(`${SERVER_URL}/auth/refresh`, {
      method: "POST",
      credentials: "include",
    });
    if (!res.ok) return null;
    const data = await res.json();
    localStorage.setItem("token", data.token);
    return data.token;
  } catch {
    return null;
  }
};

export const api = async (path: string, init?: RequestInit) => {
  const url = `${SERVER_URL}${path}`;
  let token: string | null = null;
  if (typeof window !== "undefined") token = localStorage.getItem("token");
  const response = await fetch(url, {
    credentials: "include",
    ...init,
    headers: {
      ...(init?.body && { "Content-Type": "application/json" }),
      Authorization: token ? `Bearer ${token}` : "",
      ...init?.headers,
    },
  });

  if (response.status === 401) {
    if (!refreshPromise) {
      refreshPromise = refreshAccessToken().finally(() => {
        refreshPromise = null;
      });
    }

    const newToken = await refreshPromise;

    if (newToken) {
      const retryResponse = await fetch(url, {
        credentials: "include",
        ...init,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${newToken}`,
          ...init?.headers,
        },
      });
      const retryData = await retryResponse.json();
      if (!retryResponse.ok)
        throw new Error(retryData.error || "API request failed");
      return retryData;
    }

    localStorage.removeItem("token");
    throw new Error("인증이 만료되었습니다");
  }

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "API request failed");
  return data;
};
