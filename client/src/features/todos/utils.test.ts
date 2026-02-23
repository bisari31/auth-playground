import { isOwner } from "@/features/todos/utils";

describe("isOwner", () => {
  it("내 todo인 경우 true를 반환한다", () => {
    expect(isOwner(1, 1)).toBe(true);
  });
  it("내 todo가 아니면 false를 반환한다", () => {
    expect(isOwner(1, 2)).toBe(false);
  });

  it("로그인 상태가 아니면 false를 반환한다", () => {
    expect(isOwner(null, 2)).toBe(false);
    expect(isOwner(undefined, 2)).toBe(false);
  });
});
