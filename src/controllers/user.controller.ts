import { type Request, type Response, type NextFunction } from 'express';
import createDebug from 'debug';
import { HttpError } from '../middleware/errors.middleware.js';
import { UserSqlRepository } from '../repositories/user.sql.repo.js';
import { UserCreateDto, UserUpdateDto } from '../entities/user.js';
import {
  userCreateDtoSchema,
  userUpdateDtoSchema,
} from '../entities/user.schema.js';
const debug = createDebug('W7:users:controller');

export class UserController {
  constructor(private readonly repo: UserSqlRepository) {
    debug('Instantiated users controller');
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
    const data = req.body as UserCreateDto;
    const { error, value }: { error: Error | undefined; value: UserCreateDto } =
      userCreateDtoSchema.validate(data, {
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
    const data = req.body as UserUpdateDto;

    const { error } = userUpdateDtoSchema.validate(data, {
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
