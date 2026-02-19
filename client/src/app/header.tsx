"use client";

import { authApi } from "@/features/auth/api";
import { authQueries } from "@/features/auth/queries";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data } = useQuery(authQueries.me());

  const handleLogout = async () => {
    await authApi.logout();
    queryClient.invalidateQueries({ queryKey: authQueries.me().queryKey });
    router.push("/login");
  };

  return (
    <header className="border-b px-6 py-3 flex items-center justify-between">
      <Link href="/" className="font-bold">
        홈
      </Link>

      <div className="flex items-center gap-4">
        {data?.email ? (
          <>
            <span className="text-sm text-gray-600">{data.email}</span>
            <button onClick={handleLogout} className="text-sm text-red-500">
              로그아웃
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="text-sm">
              로그인
            </Link>
            <Link href="/register" className="text-sm">
              회원가입
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
