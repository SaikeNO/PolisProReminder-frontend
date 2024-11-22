export interface Task {
  id: string;
  title: string;
  completed: boolean;
  order: number;
}

export interface CreateTask {
  title: string;
}
