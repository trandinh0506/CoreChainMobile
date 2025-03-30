export interface User {
  _id: string;
  name: string;
  email: string;
  role: { name: string; _id: string };
  accessToken: string;
}
