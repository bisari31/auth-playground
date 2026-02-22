import { authApi } from "@/features/auth/api";

export const SERVER_URL = "http://localhost:4000/api";

let refreshPromise: Promise<boolean> | null = null;

const refreshAccessToken = async (): Promise<boolean> => {
  try {
    const res = await authApi.refresh();
    if (!res.ok) return false;
    return true;
  } catch {
    return false;
  }
};

export const api = async (path: string, init?: RequestInit) => {
  const url = `${SERVER_URL}${path}`;
  const response = await fetch(url, {
    credentials: "include",
    ...init,
    headers: {
      ...(init?.body && { "Content-Type": "application/json" }),
      ...init?.headers,
    },
  });

  if (response.status === 401) {
    if (!refreshPromise) {
      refreshPromise = refreshAccessToken().finally(() => {
        refreshPromise = null;
      });
    }

    const result = await refreshPromise;

    if (result) {
      const retryResponse = await fetch(url, {
        credentials: "include",
        ...init,
        headers: {
          "Content-Type": "application/json",
          ...init?.headers,
        },
      });
      const retryData = await retryResponse.json();
      if (!retryResponse.ok)
        throw new Error(retryData.error || "API request failed");
      return retryData;
    }

    throw new Error("인증이 만료되었습니다");
  }

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "API request failed");
  return data;
};
