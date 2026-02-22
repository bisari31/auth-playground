"use client";

import AuthForm from "@/features/auth/components/auth-form";
import useAuth from "@/features/auth/hooks/use-auth";
import Link from "next/link";
export default function RegisterPage() {
  const { register } = useAuth();

  return (
    <AuthForm
      onSubmit={register}
      errorMessage="회원가입에 실패했습니다"
      footer={
        <Link href="/login" className="text-center text-sm text-gray-500">
          이미 계정이 있으신가요? 로그인
        </Link>
      }
      submitLabel="회원가입"
      title="회원가입"
    />
  );
}
