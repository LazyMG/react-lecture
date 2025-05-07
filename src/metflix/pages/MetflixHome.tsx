import { useQuery } from "@tanstack/react-query";
import { getMovies, IGetMoviesResult } from "../api";
import styled from "styled-components";
import { makeImagePath } from "../utils";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  background-color: black;
  overflow-x: hidden;
  padding-bottom: 200px;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ $bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;

  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.$bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 36px;
  width: 50%;
`;

const Slider = styled.div`
  position: relative;
  top: -100px;
`;

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 5px;
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)<{ $bgPhoto: string }>`
  height: 200px;

  background-image: url(${(props) => props.$bgPhoto});
  background-size: cover;
  background-position: center center;

  cursor: pointer;

  &:first-child {
    transform-origin: center left;
  }

  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.metflix.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;

  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  opacity: 0;
`;

const MovieModal = styled(motion.div)`
  position: fixed;
  width: 40vw;
  height: 80vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background-color: ${(props) => props.theme.metflix.black.lighter};
  border-radius: 15px;
  overflow: hidden;
`;

const MovieCover = styled.div<{ $bgPhoto: string }>`
  width: 100%;
  height: 400px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.$bgPhoto});
  background-size: cover;
  background-position: center center;
`;

const MovieTitle = styled.h3`
  color: ${(props) => props.theme.metflix.white.lighter};
  font-size: 32px;
  position: relative;
  top: -90px;
  padding: 20px;
`;
const MovieOverview = styled.p`
  padding: 20px;
  color: ${(props) => props.theme.metflix.white.lighter};
  position: relative;
  top: -90px;
`;

const rowVariants: Variants = {
  hidden: {
    x: window.outerWidth + 5,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 5,
  },
};

const boxVariants: Variants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -80,
    transition: {
      delay: 0.3,
      type: "tween",
      duration: 0.3,
    },
  },
};

const infoVariants: Variants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.3,
      type: "tween",
      duration: 0.3,
    },
  },
};

const offset = 5;

const MetflixHome = () => {
  const { data, isLoading } = useQuery<IGetMoviesResult>({
    queryKey: ["movies", "now-playing"],
    queryFn: getMovies,
  });
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);

  const navigate = useNavigate();
  const movieMatch = useMatch("/metflix/movies/:movieId");

  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length;
      const maxIndex = Math.ceil(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  const toggleLeaving = () => {
    setLeaving((prev) => !prev);
  };
  const onBoxClicked = (movieId: number) => {
    navigate(`/metflix/movies/${movieId}`);
  };

  const onOverlayClick = () => {
    navigate("/metflix");
  };

  const clickedMovie =
    movieMatch?.params.movieId &&
    data?.results.find(
      (movie) => movie.id.toString() === movieMatch.params.movieId
    );

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            onClick={increaseIndex}
            $bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}
          >
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <Slider>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1 }}
                key={index}
              >
                {data?.results
                  .slice(offset * index, offset * index + offset)
                  .map((movie) => (
                    <Box
                      key={movie.id}
                      variants={boxVariants}
                      transition={{ type: "tween" }}
                      initial="normal"
                      whileHover="hover"
                      onClick={() => onBoxClicked(movie.id)}
                      $bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                      layoutId={movie.id + ""}
                    >
                      <Info variants={infoVariants}>
                        <h4>{movie.title}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>
          <AnimatePresence>
            {movieMatch && (
              <>
                <Overlay
                  onClick={onOverlayClick}
                  exit={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
                <MovieModal layoutId={movieMatch.params.movieId}>
                  {clickedMovie && (
                    <>
                      <MovieCover
                        $bgPhoto={makeImagePath(
                          clickedMovie.backdrop_path,
                          "w500"
                        )}
                      />
                      <MovieTitle>{clickedMovie.title}</MovieTitle>
                      <MovieOverview>{clickedMovie.overview}</MovieOverview>
                    </>
                  )}
                </MovieModal>
              </>
            )}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
};

export default MetflixHome;
