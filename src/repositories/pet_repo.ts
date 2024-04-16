import { Pet, PetDto } from '../entities/pet';

export type RepoPet = {
  readAll(): Promise<Pet[]>;
  readById(id: string): Promise<Pet>;
  create(data: PetDto): Promise<Pet>;
  update(id: string, data: Partial<Pet>): Promise<Pet>;
  delete(id: string): Promise<Pet>;
};
