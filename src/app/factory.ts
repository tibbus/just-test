import { AuthService } from './services/index';

const useFactory = (auth: AuthService) => () => auth.getUser();

export default useFactory;