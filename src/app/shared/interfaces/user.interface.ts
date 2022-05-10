export interface User {
  _id: string;
  name: string;
  surname: string;
  createdAt: string;
  roles: {
    admin: boolean;
    basic: boolean;
  }
}
