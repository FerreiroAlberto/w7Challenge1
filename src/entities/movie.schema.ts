import Joi from 'joi';
import { MovieDto } from './movies';

export const movieCreateDtoSchema = Joi.object<MovieDto>({
  name: Joi.string().required(),
  genre: Joi.string().required(),
  year: Joi.number(),
  isOscarWinner: Joi.boolean().default(false),
});

export const movieUpdateDtoSchema = Joi.object<MovieDto>({
  name: Joi.string().optional(),
  genre: Joi.string().optional(),
  year: Joi.number().optional(),
  isOscarWinner: Joi.boolean().optional(),
});
