import { HTTP_UNAUTHORIZED } from "../../constants/HTTPCode"

export default class UnAuthorizedException extends Error {
    constructor(message) {
        super(message || "Unauthorized")

        this.status = HTTP_UNAUTHORIZED
    }
}
