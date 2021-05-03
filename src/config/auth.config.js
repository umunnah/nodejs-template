import { UserModel } from "../app/models"
import { env }       from "../helpers/core.helper"

export default {
    passwordField: "password",

    hashRounds: 12,

    tokenExpiration: env("JWT_EXPIRE",60 * 60),

    jwtSecret: env("JWT_SECRET","s234thj"),

    request: {
        usernameField: "username",
        passwordField: "password",
    },

    authModel: UserModel,
}
