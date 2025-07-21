import joi from 'joi'

export const signup ={
    body:joi.object().required().keys({
        name:joi.string().required(),
        email:joi.string().email().required(),
        password:joi.string().pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/)).required(),
        cPassword:joi.string().valid(joi.ref('password')).required()
    })
}
export const signin ={
    body:joi.object().required().keys({
        email:joi.string().email().required(),
        password:joi.string().pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/)).required(),
    })
}

export const confirmEmail ={
    params:joi.object().required().keys({
    token:joi.string().email().required(),
    })
}
