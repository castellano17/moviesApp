import {HttpAdapter} from '../../../config/adapters/http/http.adapter';
import {MovieDBMoviesResponse} from '../../../infrastructure/interfaces/movie-db.responses';
import {MovieMapper} from '../../../infrastructure/mappers/movie.mapper';
import type {Movie} from '../../entities/movie.entity.ts';

interface Option {
  page?: number;
  limit?: number;
}

export const moviesTopRatedUseCase = async (
  fetcher: HttpAdapter,
  options?: Option,
): Promise<Movie[]> => {
  try {
    const topRated = await fetcher.get<MovieDBMoviesResponse>('/top_rated', {
      params: {
        page: options?.page ?? 1,
        limit: options?.limit ?? 10,
      },
    });

    return topRated.results.map(MovieMapper.fromMovieDBResultToEntity);
  } catch (error) {
    console.log(error);
    throw new Error('Error fetching movies - TopRated');
  }
};
