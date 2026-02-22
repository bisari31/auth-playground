import { useState } from "react";

interface AuthForm {
  onSubmit: (email: string, password: string) => Promise<void>;
  errorMessage: string;
  title: string;
  footer: React.ReactNode;
  submitLabel: string;
}

export default function AuthForm({
  onSubmit,
  errorMessage,
  title,
  footer,
  submitLabel,
}: AuthForm) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setError("");
    try {
      await onSubmit(email, password);
    } catch (err) {
      setError(errorMessage);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center gap-4"
    >
      <h1 className="text-2xl font-bold">{title}</h1>

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
        {submitLabel}
      </button>
      {footer}
    </form>
  );
}
