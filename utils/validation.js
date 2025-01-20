
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

const validatePassword = (password) => {
    // Pelo menos 8 caracteres
    // Pelo menos 1 número
    // Pelo menos 1 letra
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return re.test(password);
};

const validateName = (name) => {
    return name.length >= 2 && name.length <= 50;
};

module.exports = {
    validateEmail,
    validatePassword,
    validateName
};