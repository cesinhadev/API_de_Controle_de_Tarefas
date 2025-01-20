
// Classe customizada para erros da API
class ApiError extends Error {
	constructor(statusCode, message) {
		super(message);
		this.statusCode = statusCode;
		this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
		Error.captureStackTrace(this, this.constructor);
	}
}

// Tratamento de erros do Mongoose
const handleMongooseError = (err) => {
	let errors = {};

	// Erro de validação
	if (err.name === "ValidationError") {
		Object.keys(err.errors).forEach((key) => {
			errors[key] = err.errors[key].message;
		});
		return new ApiError(400, { errors });
	}

	// Erro de campo único/duplicado
	if (err.code === 11000) {
		const field = Object.keys(err.keyPattern)[0];
		return new ApiError(400, `O campo ${field} já está em uso`);
	}

	// Erro de ID inválido
	if (err.name === "CastError") {
		return new ApiError(400, `ID inválido: ${err.value}`);
	}

	return err;
};

// Middleware principal de tratamento de erros
const errorHandler = (err, req, res, next) => {
	console.error("Error:", {
		message: err.message,
		stack: err.stack,
		timestamp: new Date().toISOString(),
	});

	// Se já é um ApiError, usa ele diretamente
	if (err instanceof ApiError) {
		return res.status(err.statusCode).json({
			status: err.status,
			msg: err.message,
		});
	}

	// Trata erros específicos do Mongoose
	if (
		err.name === "ValidationError" ||
		err.name === "CastError" ||
		err.code === 11000
	) {
		const mongooseError = handleMongooseError(err);
		return res.status(mongooseError.statusCode).json({
			status: mongooseError.status,
			msg: mongooseError.message,
		});
	}

	// Erros de JWT
	if (err.name === "JsonWebTokenError") {
		return res.status(401).json({
			status: "fail",
			msg: "Token inválido",
		});
	}

	if (err.name === "TokenExpiredError") {
		return res.status(401).json({
			status: "fail",
			msg: "Token expirado",
		});
	}

	// Erro de sintaxe JSON
	if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
		return res.status(400).json({
			status: "fail",
			msg: "JSON inválido",
		});
	}

	// Erros não tratados (500 Internal Server Error)
	const statusCode = err.statusCode || 500;
	const message =
		process.env.NODE_ENV === "production"
			? "Erro interno do servidor"
			: err.message;

	return res.status(statusCode).json({
		status: "error",
		msg: message,
		...(process.env.NODE_ENV === "development" && { stack: err.stack }),
	});
};

// Helper para criar erros da API
const createApiError = (statusCode, message) => {
	return new ApiError(statusCode, message);
};

module.exports = {
	errorHandler,
	ApiError,
	createApiError,
};
