import { env } from "./../helpers/core.helper"

export default {
    name: env("APP_NAME"),
    port: env("APP_PORT"),
    debug: env("APP_DEBUG", false),
}
