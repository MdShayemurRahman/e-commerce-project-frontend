export type Role = 'admin' | 'customer';

export default interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}



