export type Pet = {
  id: string;
  name: string;
  species: string;
  owner: string;
  isAdopted: boolean;
};

export type PetDto = {
  name: string;
  species: string;
  owner: string;
  isAdopted: boolean;
};