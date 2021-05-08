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
import { AppConfig, DBConfig,PassportConfig } from "./../config";
import routes from "./../routes";

class App {
	constructor() {
		this.app = express();
		this.appDebug = AppConfig.debug === "true";

		this.setup();
		this.database();
		this.authentication();
		this.routers();
	}

	setup() {
		this.app.use(helmet());
		this.app.use(compression());
		this.app.use(express.json());
		this.app.use(express.urlencoded({extended:true}));
		this.app.use(logger("dev"));
		this.app.use(cors());
		this.app.use(methodOverride("_method"));
	}

	database() {
		// initialize knex
		const knex = Knex(DBConfig);
		Model.knex(knex);
	}

	routers() {
		routes(this.app);

		this.app.use(errorHandler);
	}

	authentication() {
		this.app.use(passport.initialize({}))
		PassportConfig(passport);
}

}

export default new App().app;
