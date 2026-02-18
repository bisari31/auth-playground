import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import TodoList from "@/todos/TodoList";
import { todoQueries } from "@/todos/queries";

export default async function Page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(todoQueries.list());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TodoList />
    </HydrationBoundary>
  );
}
