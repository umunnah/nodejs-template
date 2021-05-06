import {
    auth,
    FormValidations,
}                       from "../app/middlewares"
import UsersValidations from "./../app/validations/users.validations"
import Router           from "../libraries/router"
import multer from "multer"

const upload = multer();

Router.get("/", "UsersController@index")
Router.get("/:userId", "UsersController@show")
Router.post("/", [upload.array(),UsersValidations.create, FormValidations], "UsersController@create")
Router.patch("/:userId", [auth, UsersValidations.update, FormValidations], "UsersController@update")
Router.post("/:userId/change-password", [auth, UsersValidations.passwordChange, FormValidations], "UsersController@changePassword")
Router.delete("/:userId", auth, "UsersController@delete")

export default Router.export()
