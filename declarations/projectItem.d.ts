export type ProjectItem = {
  _id: string;
  name: string;
  description: string;
  attachments: Array<string>;
  department: string;
  manager: string;
  teamMembers: Array<{
    _id: string;
    name: string;
  }>;
  tasks: string[];
  expenses: Array<{
    cost: number;
    reason: string;
  }>;
  revenue: number;
  priority: number;
  status: number;
  progress: number;
  startDate: Date;
  endDate: Date;
  actualEndDate: Date;
};
