"use client";

import AuthForm from "@/features/auth/components/auth-form";
import useAuth from "@/features/auth/hooks/use-auth";
import Link from "next/link";

export default function LoginPage() {
  const { login } = useAuth();

  return (
    <AuthForm
      onSubmit={login}
      submitLabel="로그인"
      title="로그인"
      errorMessage="로그인에 실패했습니다"
      footer={
        <Link href="/register" className="text-center text-sm text-gray-500">
          계정이 없으신가요? 회원가입
        </Link>
      }
    />
  );
}
