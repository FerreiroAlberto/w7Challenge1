export type Movie = {
  id: string;
  name: string;
  genre: string;
  year: number;
  pet?: string;
  isOscarWinner: boolean;
};

export type MovieDto = {
  name: string;
  genre: string;
  year: number;
  isOscarWinner: boolean;
};
