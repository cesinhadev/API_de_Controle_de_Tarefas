// faz uma verificação se possui o taken de acesso

const jwt = require('jsonwebtoken')

const checkToken = (req,res,next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1];


    if(!token){
        return res.status(401).json({ msg: "Acesso negado!!" })
    }

    try {
        const JWT_SECRET = process.env.JWT_SECRET
        const verified = jwt.verify(token, JWT_SECRET);
        req.userId = verified.id
        next()
    } catch (error) {
        res.status(400).json({ msg: "Token invalido" })
    }

}

module.exports = checkToken;