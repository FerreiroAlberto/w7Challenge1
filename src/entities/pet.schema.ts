import Joi from 'joi';
import { PetDto } from './pet';

export const petCreateDtoSchema = Joi.object<PetDto>({
  name: Joi.string().required(),
  species: Joi.string().required(),
  owner: Joi.string().default(''),
  isAdopted: Joi.boolean().default(false),
});

export const petUpdateDtoSchema = Joi.object<PetDto>({
  name: Joi.string(),
  species: Joi.string(),
  owner: Joi.string(),
  isAdopted: Joi.boolean(),
});
