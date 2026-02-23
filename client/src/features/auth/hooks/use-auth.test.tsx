import { authApi } from "@/features/auth/api";
import useAuth from "@/features/auth/hooks/use-auth";
import { authQueries } from "@/features/auth/queries";
import { User } from "@/features/auth/type";
import { renderHookWithClient } from "@/test/test-utils";
import { act, renderHook } from "@testing-library/react";

const user: User = { email: "test@test.com", id: 1 };

const mockRouterPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockRouterPush }),
}));

describe("useAuth", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("로그인 호출 시 캐시가 업데이트되고 '/' 경로로 이동한다", async () => {
    vi.spyOn(authApi, "login").mockResolvedValue(user);
    const { result, queryClient } = renderHookWithClient(useAuth);
    await act(async () => {
      result.current.login("test@test.com", "1234");
    });

    expect(authApi.login).toHaveBeenCalledWith("test@test.com", "1234");
    expect(queryClient.getQueryData(authQueries.me().queryKey)).toEqual(user);
    expect(mockRouterPush).toHaveBeenCalledWith("/");
  });

  it("회원가입 호출 시 캐시가 업데이트되고 '/' 경로로 이동한다", async () => {
    vi.spyOn(authApi, "register").mockResolvedValue(user);
    const { result, queryClient } = renderHookWithClient(useAuth);

    await act(async () => {
      result.current.register("test@test.com", "1234");
    });

    expect(authApi.register).toHaveBeenCalledWith("test@test.com", "1234");
    expect(queryClient.getQueryData(authQueries.me().queryKey)).toEqual(user);
    expect(mockRouterPush).toHaveBeenCalledWith("/");
  });

  it("로그아웃 호출 시 캐시가 null로 설정되고 '/login'으로 이동한다", async () => {
    vi.spyOn(authApi, "logout").mockResolvedValue({ success: true });
    const { result, queryClient } = renderHookWithClient(useAuth);
    await act(async () => {
      result.current.logout();
    });

    expect(authApi.logout).toHaveBeenCalled();
    expect(queryClient.getQueryData(authQueries.me().queryKey)).toBeNull();
    expect(mockRouterPush).toHaveBeenCalledWith("/login");
  });

  it("로그아웃 API가 실패해도 캐시 정리와 리다이렉트는 수행한다", async () => {
    vi.spyOn(authApi, "logout").mockRejectedValue(new Error("네트워크 에러"));
    const { result, queryClient } = renderHookWithClient(useAuth);
    await act(async () => {
      result.current.logout();
    });

    expect(queryClient.getQueryData(authQueries.me().queryKey)).toBeNull();
    expect(mockRouterPush).toHaveBeenCalledWith("/login");
  });
});
