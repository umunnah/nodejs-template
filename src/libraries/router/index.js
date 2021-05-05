import { Router as ExpressRouter } from "express"
import * as Controllers            from "../../app/controllers"

class Router {
    constructor() {
        this.router = ExpressRouter()
    }

    get(path, ...actions) {
        this.router.get(path, ...this._resolveController(actions))
    }

    post(path, ...actions) {
        this.router.post(path, ...this._resolveController(actions))
    }

    patch(path, ...actions) {
        this.router.patch(path, ...this._resolveController(actions))
    }

    delete(path, ...actions) {
        this.router.delete(path, ...this._resolveController(actions))
    }

    export() {
        return this.router
    }

    _resolveController(actions) {
        const lastIndex = actions.length - 1
        const action = actions[lastIndex]

        const [controllerName, methodName] = action.split("@")
        // console.log("controller name",controllerName);
        // console.log("method name",methodName);
        const controller = new Controllers[controllerName]
        // console.log("controller",controller);

        actions[lastIndex] = typeof action === "string" ? controller[methodName].bind(controller) : action
        return actions
    }
}

export default new Router()
