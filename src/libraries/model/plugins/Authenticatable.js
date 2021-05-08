import jwt from "jsonwebtoken";
import { AuthConfig } from "../../../config";
import { UnAuthenticatedException } from "../../exceptions";

export default (base) =>
	class extends base {
		generateToken() {
			const today = new Date();
			const expirationDate = new Date(today);
			expirationDate.setTime(
				today.getTime() + AuthConfig.tokenExpiration * 1000
			);

			return jwt.sign(
				{
					id: this.id,
					email: this.email,
					exp: parseInt((expirationDate.getTime() / 1000).toString(), 10),
				},
				AuthConfig.jwtSecret
			);
		}

		async authenticate(username, password, done) {
			try {
				const user = await AuthConfig.authModel
					.query()
					.findOne({ username: username });
				const passwordMatch = await user.matchPassword(password);

				if (passwordMatch === false) {
					throw new UnAuthenticatedException("Incorrect credentials");
				}
				return done(null, user);
			} catch (e) {
				throw new UnAuthenticatedException("Incorrect credentials");
			}
		}

		async authenticateJwt(jwtPayload, done) {
			const user = await AuthConfig.authModel.query().findById(jwtPayload.id);

			if (!user) {
				throw new UnAuthenticatedException("Unauthenticated");
			}

			return done(null, user);
		}
	};
