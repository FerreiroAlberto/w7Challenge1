import express, { type Express } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import createDebug from 'debug';
import { PetsRouter } from './routers/pet.router.js';

import { PetController } from './controllers/pet.controller.js';
import { ErrorsMiddleware } from './middleware/errors.middleware.js';
import { type PrismaClient } from '@prisma/client';
import { PetSqlRepository } from './repositories/pet.sql.repo.js';
import { MovieRepository } from './repositories/movie.fs.repo.js';
import { MovieController } from './controllers/movie.controller.js';
import { MoviesRouter } from './routers/movie.router.js';

const debug = createDebug('W7:app');

export const createApp = () => {
  const app = express();
  return app;
};

export const startApp = (app: Express, prisma: PrismaClient) => {
  debug('Starting app');

  const petRepo = new PetSqlRepository(prisma);
  const petController = new PetController(petRepo);
  const petRouter = new PetsRouter(petController);
  const errorMiddleware = new ErrorsMiddleware();
  const movieRepo = new MovieRepository();
  const movieController = new MovieController(movieRepo);
  const movieRouter = new MoviesRouter(movieController);

  app.use(express.json());
  app.use(morgan('dev'));
  app.use(cors());
  app.use(express.static('public'));
  app.use('/pets', petRouter.router);
  app.use('/movies', movieRouter.router);
  app.use(errorMiddleware.handle.bind(errorMiddleware));
};
