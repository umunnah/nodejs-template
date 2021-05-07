import passport from "passport";
import { UnAuthorizedException } from "../exceptions";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import LocalStrategy from "passport-local";
import { AuthConfig} from "../../config"

class Auth {
	handle(req, res, next) {
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
		passport.authenticate(
			"jwt",
			{
				session: false,
			},
			(err, user, info) => {
				if (!user) {
					return next(new UnAuthorizedException(info.message));
				}

				req.user = user;
				next();
			}
		)(req, res, next);
	}
}

export default new Auth().handle;
