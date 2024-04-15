import { type Request, type Response, type NextFunction } from 'express';
import { PetDto, type Pet } from '../entities/pet.js';
import { type PetRepository } from '../repositories/pet.repo.js';
import createDebug from 'debug';
import {
  petCreateDtoSchema,
  petUpdateDtoSchema,
} from '../entities/pet.schema.js';
import { HttpError } from '../middleware/errors.middleware.js';
const debug = createDebug('W7:articles:controller');

export class PetController {
  constructor(private readonly repo: PetRepository) {
    debug('Instantiated article controller');
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
      const result = this.repo.readById(id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    const data = req.body as Pet;
    const { error, value }: { error: Error | undefined; value: PetDto } =
      petCreateDtoSchema.validate(data, {
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
    const data = req.body as Pet;

    const { error } = petUpdateDtoSchema.validate(data, {
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
