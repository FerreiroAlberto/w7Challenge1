import { Pet, PetDto } from '../entities/pet';

export type RepoPet = {
  readAll(): Promise<Pet[]>;
  readById(id: string): Promise<Pet>;
  create(data: PetDto): Promise<Pet>;
  update(id: string, data: Partial<Pet>): Promise<Pet>;
  delete(id: string): Promise<Pet>;
};

export type Repo<T, C> = {
  readAll(): Promise<T[]>;
  readById(id: string): Promise<T>;
  create(data: C): Promise<T>;
  update(id: string, data: Partial<C>): Promise<T>;
  delete(id: string): Promise<T>;
};
