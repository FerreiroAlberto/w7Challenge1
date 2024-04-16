import { PrismaClient } from '@prisma/client';
import { PetSqlRepository } from './pet.sql.repo';
import { HttpError } from '../middleware/errors.middleware';
import { PetDto } from '../entities/pet';

const mockPrisma = {
  pet: {
    findMany: jest.fn().mockResolvedValue([]),
    findUnique: jest.fn().mockResolvedValue({ id: '1' }),
    create: jest.fn().mockResolvedValue({}),
    update: jest.fn().mockResolvedValue({}),
    delete: jest.fn().mockResolvedValue({}),
  },
} as unknown as PrismaClient;

describe('Given a instance of the class PetRepository', () => {
  const repo = new PetSqlRepository(mockPrisma);

  test('Then it should be instance of the class', () => {
    expect(repo).toBeInstanceOf(PetSqlRepository);
  });
  describe('When I use the method readAll', () => {
    test('Then it should call prisma.findMany', async () => {
      const result = await repo.readAll();
      expect(mockPrisma.pet.findMany).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });
  describe('When I use the method readById', () => {
    test('Then it should call prisma.findMany', async () => {
      const result = await repo.readById('1');
      expect(mockPrisma.pet.findUnique).toHaveBeenCalled();
      expect(result).toEqual({ id: '1' });
    });
  });
  describe('When I use the method readById with an invalid id', () => {
    test('Then it should throw an error', async () => {
      (mockPrisma.pet.findUnique as jest.Mock).mockResolvedValue(null);
      await expect(repo.readById('2')).rejects.toThrow(
        new HttpError(404, 'Not Found', `Pet 2 not found`)
      );
    });
  });
  describe('When I use the method create', () => {
    test('Then it should call prisma.create', async () => {
      const data = {} as unknown as PetDto;
      const result = await repo.create(data);
      expect(result).toEqual({});
      expect(mockPrisma.pet.create).toHaveBeenCalled();
    });
  });
  describe('When I use the method update', () => {
    test('Then it should call prisma.update', async () => {
      const result = await repo.update('1', {});
      expect(result).toEqual({});
      expect(mockPrisma.pet.update).toHaveBeenCalled();
    });
  });
});
