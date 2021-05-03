import {
	NotFoundException,
	UnAuthorizedException,
	ValidationException,
} from "../../app/exceptions";

import { ModelNotFoundException } from "../libraries/Repository/exceptions";

const errorHandler = (error, req, res, next) => {
	let error = { ...error };
	error.message = err.message;
	if (
		error instanceof NotFoundException ||
		error instanceof ModelNotFoundException
	) {
		res.status(error.status || HTTP_NOT_FOUND).json({
			message: error.message,
		});

		return;
	}

	if (error instanceof ValidationException) {
		res.status(error.status || HTTP_UNPROCESSABLE_ENTITY).json({
			errors: error.errors,
			message: error.message,
		});

		return;
	}

	if (error instanceof UnAuthorizedException) {
		res.status(error.status || HTTP_UNAUTHORIZED).json({
			message: error.message,
		});

		return;
	}

	res.status(error.status || HTTP_INTERNAL_SERVER_ERROR).json({
		message: this.appDebug ? error.message : "Server error.",
		errors: this.appDebug ? error : null,
	});
};

module.exports = errorHandler;
