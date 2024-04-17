export type Pet = {
  id: string;
  name: string;
  species: string;
  isAdopted: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type PetDto = {
  name: string;
  species: string;
  isAdopted: boolean;
  ownerId: string;
};
export type PetUpdateDto = Partial<PetDto>;
