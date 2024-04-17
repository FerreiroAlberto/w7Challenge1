export type Movie = {
  id: string;
  name: string;
  genre: string;
  year: number;
  isOscarWinner: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type MovieDto = {
  name: string;
  genre: string;
  year: number;
  isOscarWinner: boolean;
};
