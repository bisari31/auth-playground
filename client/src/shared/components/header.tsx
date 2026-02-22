"use client";

import useAuth from "@/features/auth/hooks/use-auth";
import useMe from "@/features/auth/hooks/use-me";
import Link from "next/link";

export default function Header() {
  const { data: me } = useMe();
  const { logout } = useAuth();

  return (
    <header className="flex items-center justify-between border-b px-6 py-3">
      <Link href="/" className="font-bold">
        홈
      </Link>

      <div className="flex items-center gap-4">
        {me?.email ? (
          <>
            <span className="text-sm text-gray-600">{me.email}</span>
            <button onClick={logout} className="text-sm text-red-500">
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
