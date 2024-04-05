export type TNewUser = {
  firstname: string;
  lastname: string;
  email: string;
  phoneNo: string;
  password: string;
  role: string;
};

export type TUser = {
  id: string;
  firstname: string;
  lastname: string;
  uname: string;
  email: string;
  phoneNo: string;
  createdAt: string;
  updatedAt: string;
  role: string;
  enabled: boolean;
  username: string;
  accountNonLocked: boolean;
  accountNonExpired: boolean;
  credentialsNonExpired: boolean;
};

export type AuthUser = {
  collegeId: number;
  user: TUser;
  address: string;
  avatar: string;
};
