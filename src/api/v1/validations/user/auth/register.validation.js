import Joi from 'joi';

const userRegistrationValidation = ({ username, email, password }) => {
    const joiSchema = Joi.object().keys({
        username: Joi.string().trim().required()
            .messages({
                "string.base": `Your Username should be a type of String`,
                "string.empty": `Your Username cannot be an empty field`,
                "any.required": `Your Username is required.`
            }),
        email: Joi.string().lowercase()
            .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "in", "co"], }, }).required()
            .messages({
                "string.base": `Email should be a type of String`,
                "string.empty": `Email cannot be an empty field`,
                "string.email": `Please enter Correct Email ["com", "net", "in", "co"]`,
                "any.required": `Email is required.`,
            }),
    
        password: Joi.string().min(6).required()
            .messages({
                "string.base": `Password should be a type of Text`,
                "string.pattern.base": `Password must be minimum 6 Characters with one special character and one number! `,
                "string.empty": `Password cannot be an empty field`,
                "any.required": `Password is required.`,
            })
    })

    const { value, error } = joiSchema.validate({ username, email, password }, { escapeHtml: true })
    return { value, error }
}

export { userRegistrationValidation }