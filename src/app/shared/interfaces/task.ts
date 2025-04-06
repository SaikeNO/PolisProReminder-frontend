export interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
  order: number;
}

export interface CreateTask {
  title: string;
  order: number;
}
