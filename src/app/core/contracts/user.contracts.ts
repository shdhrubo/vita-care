export interface UpsertUserRequest {
  Email: string;
  Name: string;
}

export interface DbUser {
  Email: string;
  Name: string;
  Roles: string[];
}
