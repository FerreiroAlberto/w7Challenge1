import { PetController } from '../controllers/pet.controller';
import { PetsRouter } from './pet.router';

describe('Given a instance of the class PetsRouter', () => {
  const controller = {
    getAll: jest.fn(),
    getById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  } as unknown as PetController;
  const router = new PetsRouter(controller);
  test('Then it should be instance of the class', () => {
    expect(router).toBeInstanceOf(PetsRouter);
  });
});
