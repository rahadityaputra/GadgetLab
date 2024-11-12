import  Joi  from "joi";
import { User } from "../model/userModel.js";

export const signupSchema = Joi.object({
    username : Joi.string().min(3).max(30).required(),
    email : Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password : Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    passwordConfirmation : Joi.ref('password')
})


export const loginSchema = Joi.object({
    email : Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password : Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});


export const authenticationSignUp = async (username, email, password, passwordConfirmation) => {
    const {error} = signupSchema.validate({username, email, password, passwordConfirmation});

    if (error) {
        return {
            success : false,
            message : error.details[0].message
        }
    }

    // masukkan ke database
    try {
        const user = await User.create({username, email, password});
        return {
            success : true,
            user : {
                id : user.id_user,
                username : user.username
            }
        }
    } catch (error) {
        return {
            success : false,
            message : error.message
        }
    }

}


export const authenticationLogin = async (email, password) => {
    const {error} = loginSchema.validate({email, password});

    if (error) {
        throw new Error(error.details[0].message);
    }

    // cek di database
    const user = await User.findOne({
        where : {email, password}
    });

    if (user === null) {
        return {
            success : true,
            message : "User not found"
        }
        
    } 

    return {
        success : true,
        user : {
            id : user.id_user,
            username : user.username
        }
    }



}


