const router = require("express").Router();
const User = require("../models/User");
const checkToken = require("../middlewares/checkToken");
const { validateEmail } = require("../utils/validation");
const { createApiError } = require("../middlewares/errorHandler");

// Obter perfil do usuário
router.get("/profile", checkToken, async (req, res, next) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        if (!user) {
            throw createApiError(404, "Usuário não encontrado");
        }
        res.status(200).json({ user });
    } catch (error) {
        next(error);
    }
});

// Atualizar perfil do usuário
router.put("/profile", checkToken, async (req, res, next) => {
    try {
        const { name, email } = req.body;
        const updateFields = {};

        if (name) updateFields.name = name;
        
        if (email) {
            if (!validateEmail(email)) {
                throw createApiError(422, "Formato de email inválido");
            }
            
            const emailExists = await User.findOne({ email, _id: { $ne: req.userId } });
            if (emailExists) {
                throw createApiError(422, "Email já está em uso");
            }
            
            updateFields.email = email;
        }

        const user = await User.findByIdAndUpdate(
            req.userId,
            updateFields,
            { new: true }
        ).select("-password");

        if (!user) {
            throw createApiError(404, "Usuário não encontrado");
        }

        res.status(200).json({
            msg: "Perfil atualizado com sucesso",
            user
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;

