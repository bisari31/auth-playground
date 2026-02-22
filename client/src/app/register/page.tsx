"use client";

import { authApi } from "@/features/auth/api";
import { authQueries } from "@/features/auth/queries";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const queryClient = useQueryClient();
  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await authApi.register(email, password);
      queryClient.setQueryData(authQueries.me().queryKey, res);
      router.push("/");
    } catch (err) {
      setError("회원가입에 실패했습니다");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center gap-4"
    >
      <h1 className="text-2xl font-bold">회원가입</h1>

      {error && <p className="text-red-500">{error}</p>}

      <input
        type="string"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="rounded border px-3 py-2"
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="rounded border px-3 py-2"
      />
      <button type="submit" className="rounded bg-blue-500 py-2 text-white">
        회원가입
      </button>
      <Link href="/login" className="text-center text-sm text-gray-500">
        이미 계정이 있으신가요? 로그인
      </Link>
    </form>
  );
}
