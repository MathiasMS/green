export type User = {
  id: string;
  email: string;
  password: string;
};

type UserParams = {
  id: string;
  email: string;
  password: string;
};

export const createUser = ({ id, email, password }: UserParams): User => {
  const user: User = { id, email, password };

  // validateUser(user);

  return user;
};

const validateUser = (user: User): void => {
  if (!user.email.includes('@')) throw new Error('Invalid email');
  if (user.password.length < 8)
    throw new Error('Password must be at least 8 characters');
  if (!/[A-Z]/.test(user.password))
    throw new Error('Password must contain at least one uppercase letter');
  if (!/[a-z]/.test(user.password))
    throw new Error('Password must contain at least one lowercase letter');
  if (!/[0-9]/.test(user.password))
    throw new Error('Password must contain at least one number');
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(user.password))
    throw new Error('Password must contain at least one special character');
};

export type UserAuthInfo = {
  email: string;
  password: string;
};

export interface UserRepository {
  signUp: (data: UserAuthInfo) => Promise<User>;
  signIn: (data: UserAuthInfo) => Promise<User>;
  logout: () => Promise<void>;
}
