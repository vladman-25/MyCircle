const joi = require("joi");

const register = joi.object({
    email:          joi.string().trim().required().email().messages({
        'string.empty': `Please enter a valid email!`,
        'string.email': `Please enter a valid email!`,
        'any.required': `Email is a required field`
    }),
    username:       joi.string().trim().required().messages({
        'string.empty': `Username cannot be empty!`,
        'any.required': `Please provide a value for username!`
    }),
    phone:    joi.string().pattern(/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/m).trim().required().messages({
        'string.empty': `Phone number cannot be empty!`,
        'any.required': `Please provide a value for phone number!`,
        "string.pattern.base": "Phone number must be in a valid format, i.e +407########, +373########"
    }),
    password:       joi.string().trim().required().min(8).messages({
        'string.empty': `Password cannot be empty!`,
        'any.required': `Please provide a value for password!`,
        "string.min": "Password must have at least 8 characters",
    }),
});

const login = joi.object({
    email:          joi.string().trim().required().email().messages({
        'string.empty': `Please enter a valid email!`,
        'string.email': `Please enter a valid email!`,
        'any.required': `Email is a required field`
    }),
    password:       joi.string().trim().required().messages({
        'string.empty': `Password cannot be empty!`,
        'any.required': `Password is a required field!`
    }),
});

const createUser = joi.object({
    email:          joi.string().trim().required().email().messages({
        'string.empty': `Please enter a valid email!`,
        'string.email': `Please enter a valid email!`,
        'any.required': `Email is a required field`
    }),
    username:       joi.string().trim().required().messages({
        'string.empty': `Username cannot be empty!`,
        'any.required': `Please provide a value for username!`
    }),
    phone:    joi.string().pattern(/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/m).trim().required().messages({
        'string.empty': `Phone number cannot be empty!`,
        'any.required': `Please provide a value for phone number!`,
        "string.pattern.base": "Phone number must be in a valid format, i.e +407########, +373########"
    }),
    password:       joi.string().trim().required().min(8).messages({
        'string.empty': `Password cannot be empty!`,
        'any.required': `Please provide a value for password!`,
        "string.min": "Password must have at least 8 characters",
    }),
});
const patchUser = joi.object({
    email:          joi.string().trim().email().messages({
        'string.empty': `Please enter a valid email!`,
        'string.email': `Please enter a valid email!`,
    }),
    username:       joi.string().trim().messages({
        'string.empty': `Username cannot be empty!`,
    }),
    phone:    joi.string().pattern(/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/m).trim().messages({
        'string.empty': `Phone number cannot be empty!`,
    })
});

const validators = {
    register,
    login,
    createUser,
    patchUser
};

module.exports = validators