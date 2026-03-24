export interface UpsertUserRequest {
  Email: string;
  Name: string;
}

export interface DbUser {
  Email: string;
  Name: string;
  Roles: string[];
}

export interface PaginatedUsers {
  Items: DbUser[];
  TotalCount: number;
}

export interface UserRoleUpdateRequest {
  email: string;
  role: string;
}
