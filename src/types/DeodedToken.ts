import { JwtPayload } from "jwt-decode";

export interface DecodedToken extends JwtPayload {
  name: string;
  email: string;
  role: string;
}
