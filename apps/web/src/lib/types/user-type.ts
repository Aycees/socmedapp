export type UserType = {
  ADMIN: 'ADMIN';
  USER: 'USER';
};

export interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  bio: string | null;
  avatarUrl: string | null;
  userType: UserType;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateUserRequests = {
  username: string;
  name: string;
  email: string;
  password: string;
  bio?: string;
  avatarUrl?: string;
};