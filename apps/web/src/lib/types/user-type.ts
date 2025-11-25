export interface Role {
    id: string;
    name: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  bio: string | null;
  avatarUrl: string | null;
  role: Role;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
}