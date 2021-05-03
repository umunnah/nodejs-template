import compression from "compression";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import Knex from "knex";
import methodOverride from "method-override";
import logger from "morgan";
import { Model } from "objection";
import errorHandler from "../libraries/errorHandler";
import passport from "passport";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import LocalStrategy from "passport-local";
import { AppConfig, AuthConfig, DBConfig } from "./../config";
import routes from "./../routes";

class App {
	constructor() {
		this.app = express();
		this.appDebug = AppConfig.debug === "true";

		this.setup();
		this.database();
		// this.authentication();
		this.routers();
	}

	setup() {
		this.app.use(helmet());
		this.app.use(compression());
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use(logger("dev"));
		this.app.use(cors());
		this.app.use(methodOverride("_method"));
	}

	database() {
		const knex = Knex(DBConfig);
		Model.knex(knex);
	}

	routers() {
		routes(this.app);

		this.app.use(errorHandler);
	}

	// authentication() {
	// 	this.app.use(passport.initialize({}));

	// 	const authModel = new AuthConfig.authModel();

	// 	passport.use(
	// 		"local",
	// 		new LocalStrategy(
	// 			{
	// 				usernameField: AuthConfig.request.usernameField,
	// 				passwordField: AuthConfig.request.passwordField,
	// 			},
	// 			authModel.authenticate
	// 		)
	// 	);

	// 	passport.use(
	// 		"jwt",
	// 		new JWTStrategy(
	// 			{
	// 				jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	// 				secretOrKey: AuthConfig.jwtSecret,
	// 			},
	// 			authModel.authenticateJwt
	// 		)
	// 	);
	// }
}

export default new App().app;
