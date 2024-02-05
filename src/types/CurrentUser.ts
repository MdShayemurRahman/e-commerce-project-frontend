import User from "./User";

export interface CurrentUser extends User {
  accessToken: string;
  permissions: string[]; 
}
