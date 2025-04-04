import type { User, UserAuthInfo, UserRepository } from '../domain/User';

interface UserService {
  signUp: (data: UserAuthInfo) => Promise<User>;
  signIn: (data: UserAuthInfo) => Promise<User>;
  signOut: () => Promise<void>;
}

type Dependencies = {
  userRepository: UserRepository;
};

export default ({ userRepository }: Dependencies): UserService => ({
  signUp: async (data: UserAuthInfo): Promise<User> => {
    try {
      return await userRepository.signUp(data);
    } catch (e) {
      throw e;
    }
  },
  signIn: async (data: UserAuthInfo): Promise<User> => {
    try {
      return await userRepository.signIn(data);
    } catch (e) {
      throw e;
    }
  },
  signOut: async (): Promise<void> => {
    try {
      await userRepository.logout();
    } catch (e) {
      throw e;
    }
  },
});
