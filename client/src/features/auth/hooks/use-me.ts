import { authQueries } from "@/features/auth/queries";
import { useQuery } from "@tanstack/react-query";

export default function useMe() {
  return useQuery(authQueries.me());
}
