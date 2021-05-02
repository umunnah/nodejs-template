import { UserModel } from "../app/models"
import { env }       from "../helpers/core.helper"

export default {
    passwordField: "password",

    hashRounds: 12,

    tokenExpiration: env("JWT_EXPIRE"),

    jwtSecret: env("JWT_SECRET"),

    request: {
        usernameField: "username",
        passwordField: "password",
    },

    authModel: UserModel,
}
