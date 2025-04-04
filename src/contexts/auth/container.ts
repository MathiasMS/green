import supabaseRepository from './infra/SupabaseRepository';
import makeService from './app/service';

const service = makeService({
  userRepository: supabaseRepository(),
});

export default service;
