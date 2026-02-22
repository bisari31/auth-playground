import { authApi } from "@/features/auth/api";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { authQueries } from "@/features/auth/queries";
import { User } from "@/features/auth/type";

export default function useAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const onSuccess = (user: null | User, redirectTo: string) => {
    queryClient.setQueryData(authQueries.me().queryKey, user);
    router.push(redirectTo);
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch {
      // 실패해도 클라이언트 정리는 진행
    }
    onSuccess(null, "/login");
  };

  const login = async (email: string, password: string) => {
    const res = await authApi.login(email, password);
    onSuccess(res, "/");
  };

  const register = async (email: string, password: string) => {
    const res = await authApi.register(email, password);
    onSuccess(res, "/");
  };

  return { logout, login, register };
}
