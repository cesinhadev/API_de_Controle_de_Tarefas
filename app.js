/* Imports  */
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Models
const User = require("./models/User");

const app = express();
// Config Json responde
app.use(express.json());

app.get("/", (req, res) => {
	res.status(200).json({ msg: " Bem vindo a nossa API" });
});

//Register user
app.post("/auth/register", async (req, res) => {
	const { name, email, password, confirmpassword } = req.body;

	// validação
	if (!name) {
		return res.status(422).json({ msg: "O nome é obrigatório" });
	}
	if (!email) {
		return res.status(422).json({ msg: "O email é obrigatório" });
	}
	if (!password) {
		return res.status(422).json({ msg: "A senha é obrigatório" });
	}
	if (password !== confirmpassword) {
		return res.status(422).json({ msg: "A senha não conferem!!" });
	}

	// if user exist

	const userExist = await User.findOne({ email: email });

	if (userExist) {
		return res.status(422).json({ msg: "Por favor , utilize outro e-mail" });
	}

	//create password
	const salt = await bcrypt.genSalt(12);
	const passwordHash = await bcrypt.hash(password, salt);

	//create user
	const user = new User({
		name,
		email,
		password: passwordHash,
	});
	try {
		await user.save();
		res.status(201).json({ msg: "Usuario criado com sucesso" });
	} catch (error) {
		console.log(error);

		res
			.status(500)
			.json({ msg: "Aconteceu um erro no servidor, tente mais tarde!!" });
	}
});

//Cretenciais
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

mongoose
	.connect(
		`mongodb+srv://${dbUser}:${dbPassword}@cluster0.hawmv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
	)
	.then(() => {
		app.listen(3000);
		console.log("Conectou ao banco!");
	})
	.catch((err) => console.log(err));
