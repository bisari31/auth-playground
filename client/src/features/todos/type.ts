export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
  userId: number;
  user: {
    email: string;
    createdAt: string;
  };
}
