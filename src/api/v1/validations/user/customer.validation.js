import Joi from "joi"
const customerValidation = ({ customer_name, address, phone, type }) => {
    const joiSchema = Joi.object().keys({
        customer_name: Joi.string().required()
            .messages({
                "string.base": `Customer name should be type of String`,
                "any.required": `Customer Name Required`,
            }),
        address: Joi.string().required()
            .messages({
                "string.base": `addressshould be type of String`,
                "any.required": `address Required`,
            }),
            phone: Joi.string().required()
            .messages({
                "string.base": `phone should be type of String`,
                "any.required": `phone Required`,
            }),
            type: Joi.string().required()
            .messages({
                "string.base": `type should be type of String`,
                "any.required": `type Required`,
            }),
       
    })
    const { value, error } = joiSchema.validate({ customer_name, address, phone, type }, { escapeHtml: true })
    return { value, error }
}

export { customerValidation }