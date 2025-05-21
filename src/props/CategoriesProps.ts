export interface TasksProps {
  taskId: number;
  title: string;
  description: string;
  priority: string;
  completed: boolean;
  completedAt: string;
  createdAt: string;
  updatedAt: string
}

export interface CategoriesProps {
  taskGroupId: number;
  taskGroupName: string;
  tasks: TasksProps[];
  createdAt: string;
  updatedAt: string;
}
