import styled from 'styled-components';
import './App.css';
import { useEffect, useState } from 'react';
import { Movies } from './components/Movies';
import Axios from 'axios';
import { MoviesDetails } from './components/MoviesDetails';

export const API_KEY = 'b6becf9b';
const Container = styled.div`
display: flex;
flex-direction : column;
`;
const Header = styled.div`
position: fixed;
width: 100%;
display:flex;
justify-content:space-between;
align-items: center;
background-color: #000;
box-shadow: 0 0 15px 0 rgba(0,0,0,0.3);
padding: 10px 30px;
`;
const LogoName = styled.span`
color: #fff;
font-size: 1.3em;
font-weight: 500;
`;
const SearchBox = styled.div`
text-align: center;
box-shadow: 0 0 10px 0 rgba(0,0,0,0.2);
border-radius: 10px;
`;
const SearchInput = styled.input`
border: 1px solid #b1b1b1;
outline: none;
background: transparent;
padding: 10px 14px;
width: 30vw;
border-radius: 10px;
font-size: 16px;
color:#fff;
font-weigth: 400;
`;
const FavouriteMovie = styled.div`
color: #FFF;
font-size: 14px;
font-weight: 700;
`;
const MovieListContainer = styled.div`
display:flex;
flex-wrap: wrap;
flex-direction: row;
padding: 70px 30px;
gap:20px;
justify-content:space-between;
`;
const NoData = styled.img`
position:absolute;
top:50%;
left:50%;
transform:translate(-50%,-50%);
`;

export const App = () => {

    const [searchQuery, setSearchQuery] = useState();
    const [timeOutId, setTimeOutId] = useState();
    const [movieList, setMovieList] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [favouriteMovies, setFavouriteMovies] = useState([]);



    // useEffect(() => {
    //     const fetchData = fetch('http://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}').then((resp) => {
    //         resp.json().then((finalResp) => {
    //             // console.log(finalResp);
    //             setMovieList(resp.data.Search);
    //         })
    //     })
    // }, []);

    useEffect(() => {
        console.log('favouriteMovies: ', favouriteMovies);
    }, [favouriteMovies])


    // API Call
    const fetchData = async (searchString) => {
        const response = await Axios.get(`http://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`,
        );
        // console.log(response);
        setMovieList(response.data.Search)
    };

    // Search bar
    const onTextChange = (e) => {
        clearTimeout(timeOutId);
        setSearchQuery(e.target.value);

        const timeout = setTimeout(() => fetchData(e.target.value), 500);

        setTimeOutId(timeout);
        // return
    }
    return (
        <>
            <Container>
                <Header>
                    <LogoName>My Movie App</LogoName>


                    <SearchBox>
                        <SearchInput value={searchQuery}
                            onChange={onTextChange}
                            placeholder="Search movies name...." />
                    </SearchBox>


                    <FavouriteMovie>Favourite</FavouriteMovie>


                </Header>

                <div>
                    {
                        selectedMovie && (
                            <MoviesDetails
                                selectedMovie={selectedMovie}
                                setSelectedMovie={setSelectedMovie}
                                favouriteMovies={favouriteMovies}
                                setFavouriteMovies={setFavouriteMovies}
                            />
                        )
                    }
                </div>


                <MovieListContainer >
                    {
                        movieList?.length ?
                            movieList.map((movie, index) =>

                                <Movies key={index} movie={movie} setSelectedMovie={setSelectedMovie} />)

                            : <NoData src="./nodata.png" width="120px" />
                    }
                </MovieListContainer>
            </Container>
        </>
    )
}
