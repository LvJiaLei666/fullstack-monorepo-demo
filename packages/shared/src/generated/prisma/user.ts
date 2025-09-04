export interface UserModel {
  id: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserCreateInput {
  id?: string;
  email: string;
  password: string;
  createdAt?: string;
  updatedAt?: string;
}

export type UserUpdateInput = Partial<UserCreateInput>;

