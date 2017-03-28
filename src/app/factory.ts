import { AuthService } from './services/index';

const useFactory = (auth: AuthService) => () => auth.setUser();

export default useFactory;