import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { cookies } from "next/headers";
import TodoList from "@/features/todos/components/todo-list";
import { todoQueries } from "@/features/todos/queries";

export default async function Page() {
  const queryClient = new QueryClient();
  const cookieStore = await cookies();

  await queryClient.prefetchQuery(
    todoQueries.list({ headers: { Cookie: cookieStore.toString() } })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TodoList />
    </HydrationBoundary>
  );
}
