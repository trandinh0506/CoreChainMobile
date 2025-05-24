export type Task = {
  _id: string;
  title: string;
  description: string;
  attachments: Array<string>;
  createdBy: {
    _id: string;
    email: string;
  };
  assignedTo: string;
  projectId: string;
  priority: number;
  status: number;
  startDate: Date;
  dueDate: Date;
};
