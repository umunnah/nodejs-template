import { FormValidations } from "../app/middlewares";
import AuthValidations from "../app/validations/auth.validations";
import Router from "../libraries/router";
import multer from "multer";

const upload = multer();

Router.post(
	"/login",
	[upload.array(), AuthValidations.login, FormValidations],
	"AuthController@login"
);

export default Router.export();
