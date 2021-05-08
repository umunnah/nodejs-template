import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import LocalStrategy from "passport-local";
import { AuthConfig } from "./index";

const PassportConfig = (passport) => {
	const authModel = new AuthConfig.authModel();

	passport.use(
		"local",
		new LocalStrategy(
			{
				usernameField: AuthConfig.request.usernameField,
				passwordField: AuthConfig.request.passwordField,
			},
			authModel.authenticate
		)
	);
	passport.use(
		"jwt",
		new JWTStrategy(
			{
				jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
				secretOrKey: AuthConfig.jwtSecret,
			},
			authModel.authenticateJwt
		)
	);
};

export default PassportConfig;
