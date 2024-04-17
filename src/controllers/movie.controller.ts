import { type Request, type Response, type NextFunction } from 'express';
import { Movie, MovieDto } from '../entities/movies.js';
import createDebug from 'debug';
import {
  movieCreateDtoSchema,
  movieUpdateDtoSchema,
} from '../entities/movie.schema.js';
import { HttpError } from '../middleware/errors.middleware.js';
import { MovieRepository } from '../repositories/movie.fs.repo.js';
const debug = createDebug('W7:movies:controller');

export class MovieController {
  constructor(private readonly repo: MovieRepository) {
    debug('Instantiated movies controller');
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.repo.readAll();
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    try {
      const result = await this.repo.readById(id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    const data = req.body as MovieDto;
    const { error, value }: { error: Error | undefined; value: MovieDto } =
      movieCreateDtoSchema.validate(data, {
        abortEarly: false,
      });

    if (error) {
      next(new HttpError(406, 'Not Acceptable', error.message));
      return;
    }

    try {
      const result = await this.repo.create(data);
      res.status(201);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const data = req.body as Movie;

    const { error } = movieUpdateDtoSchema.validate(data, {
      abortEarly: false,
    });

    if (error) {
      next(new HttpError(406, 'Not Acceptable', error.message));
      return;
    }

    try {
      const result = await this.repo.update(id, data);
      res.status(202);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    try {
      const result = await this.repo.delete(id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}
