require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { errorHandler } = require("./middlewares/errorHandler");

// Importação das rotas
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");


const app = express();

// Middlewares
app.use(express.json());

// Configurações
const PORT = process.env.PORT
const MONGODB_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hawmv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Rotas
app.get("/", (req, res) => {
    res.status(200).json({ msg: "Bem-vindo à nossa API" });
});

// Registra as rotas
app.use("/auth", authRoutes);
app.use("/user", userRoutes);


// Middleware de tratamento de erros
app.use(errorHandler);

// Conexão com o banco de dados
const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Conectado ao banco de dados com sucesso!");
    } catch (error) {
        console.error("Erro ao conectar ao banco de dados:", error.message);
        process.exit(1);
    }
};

// Inicialização do servidor
const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    } catch (error) {
        console.error("Erro ao iniciar o servidor:", error.message);
        process.exit(1);
    }
};

startServer();

