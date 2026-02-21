"use client";

import { authApi } from "@/features/auth/api";
import { authQueries } from "@/features/auth/queries";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const queryClient = useQueryClient();

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await authApi.login(email, password);

      localStorage.setItem("token", res.token);
      queryClient.setQueryData(authQueries.me().queryKey, res);
      router.push("/");
    } catch (err) {
      setError("로그인에 실패했습니다");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 max-w-sm mx-auto mt-20"
    >
      <h1 className="text-2xl font-bold">로그인</h1>

      {error && <p className="text-red-500">{error}</p>}

      <input
        type="string"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border rounded px-3 py-2"
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border rounded px-3 py-2"
      />
      <button type="submit" className="bg-blue-500 text-white py-2 rounded">
        로그인
      </button>
      <Link href="/register" className="text-center text-sm text-gray-500">
        계정이 없으신가요? 회원가입
      </Link>
    </form>
  );
}
