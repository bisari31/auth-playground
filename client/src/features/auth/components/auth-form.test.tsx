import AuthForm from "@/features/auth/components/auth-form";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("AuthForm", () => {
  const setup = (onSubmit = vi.fn().mockResolvedValue(undefined)) => {
    const user = userEvent.setup();
    render(
      <AuthForm
        errorMessage="테스트 실패!"
        footer={null}
        onSubmit={onSubmit}
        submitLabel="테스트"
        title="테스트"
      />,
    );
    const email = screen.getByPlaceholderText("이메일");
    const password = screen.getByPlaceholderText("비밀번호");
    const button = screen.getByRole("button", { name: "테스트" });

    return { user, onSubmit, email, password, button };
  };

  it("submit 시 onSubmit에 email, password를 전달한다", async () => {
    const { button, email, onSubmit, password, user } = setup();
    await user.type(email, "test");
    await user.type(password, "test");
    await user.click(button);

    expect(onSubmit).toHaveBeenCalledWith("test", "test");
  });
  it("submit 시 실패시 에러 메시지를 표시한다.", async () => {
    const { button, email, onSubmit, password, user } = setup(
      vi.fn().mockRejectedValue(new Error()),
    );

    await user.type(email, "test");
    await user.type(password, "test");
    await user.click(button);

    expect(onSubmit).toHaveBeenCalledWith("test", "test");
    await waitFor(() => {
      expect(screen.getByText("테스트 실패!")).toBeInTheDocument();
    });
  });
});
