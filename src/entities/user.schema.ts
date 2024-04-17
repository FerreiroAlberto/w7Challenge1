import Joi from 'joi';
import { UserCreateDto, UserUpdateDto } from './user';

export const userCreateDtoSchema = Joi.object<UserCreateDto>({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  birthDate: Joi.string().required(),
});

export const userUpdateDtoSchema = Joi.object<UserUpdateDto>({
  name: Joi.string(),
  email: Joi.string(),
  password: Joi.string(),
  birthDate: Joi.string(),
});
