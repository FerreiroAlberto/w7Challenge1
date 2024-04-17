import createDebug from 'debug';
import { PetDto, type Pet } from '../entities/pet';
import { HttpError } from '../middleware/errors.middleware.js';
import { PrismaClient } from '@prisma/client';
import { Repo } from './pet_repo';

const debug = createDebug('W7:repository:sql');

const select = {
  name: true,
  species: true,
  owner: true,
  isAdopted: true,
  id: true,
};

export class PetSqlRepository implements Repo<Pet, PetDto> {
  constructor(private readonly prisma: PrismaClient) {}
  async readAll() {
    return this.prisma.pet.findMany({ distinct: ['createdAt', 'updatedAt'] });
  }
  async readById(inputId: string) {
    const pet = await this.prisma.pet.findUnique({
      where: { id: inputId },
      select,
    });
    if (!pet) {
      throw new HttpError(404, 'Not Found', `Pet ${inputId} not found`);
    }
    return pet;
  }
  async create(data: PetDto) {
    return this.prisma.pet.create({
      data: {
        ...data,
      },
      select,
    });
  }
  async update(inputId: string, data: Partial<PetDto>) {
    let pet: Pet;
    try {
      pet = await this.prisma.pet.update({
        where: { id: inputId },
        data,
        select,
      });
    } catch (error) {
      throw new HttpError(404, 'Not Found', `Pet ${inputId}not found`);
    }
    return pet;
  }

  async delete(inputId: string) {
    return this.prisma.pet.delete({ where: { id: inputId }, select });
  }
}
