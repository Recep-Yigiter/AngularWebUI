export enum Roles {
  ADMIN = 'Admin',
  BASIC = 'Basic',

}

export interface Role {
  id: string;
  name: string;
  normalizedName: string; // ADMINISTRATOR, STAFF, USER

}

export interface User {
  id: string;
  name: string;
  role: Role;
}
