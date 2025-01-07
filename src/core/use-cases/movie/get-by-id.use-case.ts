import {HttpAdapter} from '../../../config/adapters/http/http.adapter';
import {MovieDBMovie} from '../../../infrastructure/interfaces/movie-db.responses';
import {MovieMapper} from '../../../infrastructure/mappers/movie.mapper';
import {FullMovie} from '../../entities/movie.entity';

export const getByMovieByIDUseCase = async (
  fetcher: HttpAdapter,
  movieId: number,
): Promise<FullMovie> => {
  try {
    const movie = await fetcher.get<MovieDBMovie>(`/${movieId}`);

    const fullMovide = MovieMapper.fromMovieDBToEntity(movie);

    return fullMovide;
  } catch (error) {
    throw new Error(`Error fetching movie by id: ${movieId}`);
  }
};
