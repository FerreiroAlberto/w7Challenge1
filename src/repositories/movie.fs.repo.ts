import createDebug from 'debug';
import { readFile, writeFile } from 'fs/promises';
import { HttpError } from '../middleware/errors.middleware.js';
import { Movie, MovieDto } from '../entities/movies.js';

const debug = createDebug('W7:repository:user');

export class MovieRepository {
  constructor() {}

  private async load(): Promise<Movie[]> {
    const data = await readFile('db.json', 'utf-8');
    return JSON.parse(data) as Movie[];
  }

  private async save(articles: Movie[]) {
    await writeFile('db.json', JSON.stringify(articles, null, 2));
  }

  async readAll() {
    const movies = await this.load();
    return movies;
  }

  async readById(id: string) {
    const movies = await this.load();
    const movie = movies.find((item) => item.id === id);
    if (!movie) {
      throw new HttpError(404, 'Not Found', `Movie ${id} not found`);
    }
    return movie;
  }

  async create(data: MovieDto) {
    const newMovie: Movie = {
      id: crypto.randomUUID(),
      ...data,
    };
    let pets = await this.load();
    pets = [...pets, newMovie];

    return newMovie;
  }

  async update(inputId: string, data: Partial<MovieDto>) {
    let movies = await this.load();
    const currentMovie = movies.find((item) => item.id === inputId);
    if (!currentMovie) {
      throw new HttpError(404, 'Not Found', `Movie ${inputId} not found`);
    }

    const newMovie: Movie = { ...currentMovie, ...data };
    movies = movies.map((item) => (item.id === inputId ? newMovie : item));
    await this.save(movies);
    return newMovie;
  }

  async delete(inputId: string) {
    let movies = await this.load();
    const gonerMovie = movies.find((item) => item.id === inputId);
    if (!gonerMovie) {
      throw new HttpError(404, 'Not Found', `Movie ${inputId} not found`);
    }
    movies = movies.filter((item) => item.id !== inputId);
    await this.save(movies);
    return gonerMovie;
  }
}
