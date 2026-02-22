export const isOwner = (
  userId: number | null | undefined,
  todoUserId: number,
) => {
  return userId === todoUserId;
};
