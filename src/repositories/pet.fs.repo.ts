import createDebug from 'debug';
import { PetDto, type Pet } from '../entities/pet';
import { readFile, writeFile } from 'fs/promises';
import { HttpError } from '../middleware/errors.middleware.js';
import { RepoPet } from './pet_repo';

const debug = createDebug('W7:repository:user');

export class PetRepository implements RepoPet {
  constructor() {}

  private async load(): Promise<Pet[]> {
    const data = await readFile('db.json', 'utf-8');
    return JSON.parse(data) as Pet[];
  }

  private async save(articles: Pet[]) {
    await writeFile('db.json', JSON.stringify(articles, null, 2));
  }

  async readAll() {
    const pets = await this.load();
    return pets;
  }

  async readById(id: string) {
    const pets = await this.load();
    const pet = pets.find((item) => item.id === id);
    if (!pet) {
      throw new HttpError(404, 'Not Found', `Pet ${id} not found`);
    }
    return pet;
  }

  async create(data: PetDto) {
    const newPet: Pet = {
      id: crypto.randomUUID(),
      ...data,
    };
    let pets = await this.load();
    pets = [...pets, newPet];

    return newPet;
  }

  async update(inputId: string, data: Partial<PetDto>) {
    let pets = await this.load();
    const currentPet = pets.find((item) => item.id === inputId);
    if (!currentPet) {
      throw new HttpError(404, 'Not Found', `Pet ${inputId} not found`);
    }

    const newPet: Pet = { ...currentPet, ...data };
    pets = pets.map((item) => (item.id === inputId ? newPet : item));
    await this.save(pets);
    return newPet;
  }

  async delete(inputId: string) {
    let pets = await this.load();
    const gonerPet = pets.find((item) => item.id === inputId);
    if (!gonerPet) {
      throw new HttpError(404, 'Not Found', `Pet ${inputId} not found`);
    }
    pets = pets.filter((item) => item.id !== inputId);
    await this.save(pets);
    return gonerPet;
  }
}
