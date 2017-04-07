import { AuthService } from './auth.service';

const AuthInitializer = (auth: AuthService) => () => auth.setUser();

export default AuthInitializer;
