const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const validateRegistration = require("../middlewares/validateRegistration");
const { createPasswordHash, generateToken } = require("../utils/auth");
const { validateEmail } = require("../utils/validation");
const { createApiError } = require("../middlewares/errorHandler");

// Registro de usuário
router.post("/register", validateRegistration, async (req, res, next) => {
	try {
		const { name, email, password } = req.body;

		if (!validateEmail(email)) {
			throw createApiError(422, "Formato de email inválido");
		}

		const userExists = await User.findOne({ email });
		if (userExists) {
			throw createApiError(422, "Por favor, utilize outro e-mail");
		}

		const passwordHash = await createPasswordHash(password);

		const user = new User({
			name,
			email,
			password: passwordHash,
		});

		await user.save();

		const token = generateToken(user._id);

		const userResponse = user.toObject();
		delete userResponse.password;

		res.status(201).json({
			msg: "Usuário criado com sucesso",
			user: userResponse,
			token,
		});
	} catch (error) {
		next(error);
	}
});

// Login de usuário
router.post("/login", async (req, res, next) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			throw createApiError(422, "Email e senha são obrigatórios");
		}

		const user = await User.findOne({ email });
		if (!user) {
			throw createApiError(404, "Usuário não encontrado");
		}

		const checkPassword = await bcrypt.compare(password, user.password);
		if (!checkPassword) {
			throw createApiError(401, "Senha inválida");
		}

		const token = generateToken(user._id);

		const userResponse = user.toObject();
		delete userResponse.password;

		res.status(200).json({
			msg: "Autenticação realizada com sucesso",
			user: userResponse,
			token,
		});
	} catch (error) {
		next(error);
	}
});

module.exports = router;
