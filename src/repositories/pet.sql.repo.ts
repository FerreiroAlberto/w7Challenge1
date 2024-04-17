import createDebug from 'debug';
import { PetDto, PetUpdateDto, type Pet } from '../entities/pet';
import { HttpError } from '../middleware/errors.middleware.js';
import { PrismaClient } from '@prisma/client';

const debug = createDebug('W7:pets:repository');

const select = {
  name: true,
  species: true,
  owner: true,
  careGiver: { select: { name: true, birthDate: true } },
  isAdopted: true,
  id: true,
};

export class PetSqlRepository {
  constructor(private readonly prisma: PrismaClient) {
    debug('Instantiated pets repository');
  }
  async readAll() {
    const pets = await this.prisma.pet.findMany({ select });
    return pets;
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
  async create(newData: PetDto) {
    return this.prisma.pet.create({
      data: { ...newData },
      select,
    });
  }
  async update(inputId: string, data: PetUpdateDto) {
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
    const pet = await this.prisma.pet.findUnique({
      where: { id: inputId },
      select,
    });
    if (!pet) {
      throw new HttpError(404, 'Not Found', `Pet ${inputId} not found`);
    }
    return this.prisma.pet.delete({ where: { id: inputId }, select });
  }
}
