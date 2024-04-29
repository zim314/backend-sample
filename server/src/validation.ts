import Joi from 'joi';
import { User } from './models/user';
import { CourseSchema } from './models/course';

interface Login {
    username: string;
    password: string;
}

export const userValidation = (data: User) => {
    const schema = Joi.object({
        username: Joi.string().min(3).max(10).required(),
        password: Joi.string().min(6).required(),
        email: Joi.string().required(),
        role: Joi.string().required(),
    });
    return schema.validate(data);
};

export const loginValidation = (data: Login) => {
    const schema = Joi.object({
        email: Joi.string().min(3).max(50).required(),
        password: Joi.string().min(6).required(),
    });
    return schema.validate(data);
};

export const courseValidation = (data: CourseSchema) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().required(),
    });
    return schema.validate(data);
};
