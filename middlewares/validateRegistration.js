const validateRegistration = (req, res, next) => {
	const { name, email, password, confirmpassword } = req.body;

	if (!name || !email || !password || !confirmpassword) {
		return res.status(422).json({ msg: "Todos os campos são obrigados" });
	}

	if (password !== confirmpassword) {
		return res.status(422).json({ msg: "As senhas nao conferem !!" });
	}

    next();
};

module.exports = validateRegistration;