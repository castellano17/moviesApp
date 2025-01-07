import React from 'react';
import {Text, View} from 'react-native';
import {useMovies} from '../../hooks/useMovies';
import {ScrollView} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {PosterCarousel} from '../../components/movies/PosterCarousel';
import {HorizontalCarousel} from '../../components/movies/HorizontalCarousel';

export const HomeScreen = () => {
  const {top} = useSafeAreaInsets();

  const {
    isLoading,
    nowPlaying,
    popular,
    topRated,
    upcoming,
    popularNextPage,
    topRatedNextPage,
    upcomingNextPage,
  } = useMovies();

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={{paddingBottom: 30, marginTop: top + 20}}>
        {/* Principal */}
        <PosterCarousel movies={nowPlaying} />
        {/* Populares */}
        <HorizontalCarousel
          movies={popular}
          title="Populares"
          loadNextPage={() => popularNextPage()}
        />
        {/* top Rated */}
        <HorizontalCarousel
          movies={topRated}
          title="Mejor calificadas"
          loadNextPage={() => topRatedNextPage()}
        />

        {/* Proximamente */}
        <HorizontalCarousel
          movies={upcoming}
          title="Próximamente"
          loadNextPage={() => upcomingNextPage()}
        />
      </View>
    </ScrollView>
  );
};
