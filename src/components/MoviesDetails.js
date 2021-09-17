import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { API_KEY } from '../App';

const Container = styled.div`
position:relative;
display:flex;
justify-content:center;
padding:160px 30px 10px 30px;
z-index:1;
border-bottom: 1px solid lightgray;
cursor:pointer;
`;
const Wrapper = styled.div`
display:flex;
justify-content:space-arround;
align-item:center;
flex-wrap:wrap;
position:relative;
width:1000px;
padding: 20px 10px;
box-shadow:0 0 10px rgba(0,0,0,0.3);
`;

const ImageBox = styled.div`
flex-basis:31%;
min-width:300px;
`;
const CoverImage = styled.img`
height: 340px;
width:290px;
`;
const ContentBox = styled.div`
flex-basis:69%;
min-width:300px;
`;
const Details = styled.span`
color:#000;
padding-top:15px;
font-size:16px;
font-weight:700;
display:block;
text-transform: capitalize;
&:first-child{
    padding-bottom:15px;
}
& span{
    font-weight:400;
}
`;
const CloseBtn = styled.span`;
position:absolute;
top:0;
right:0;
padding:8px;
color:#000;
font-size:16px;
font-weight:700;
background: crimson;
&:hover{
    background: #000;
    color:#fff;
}
`;

export const MoviesDetails = ({ selectedMovie, setSelectedMovie, favouriteMovies, setFavouriteMovies }) => {

    const [movieInfo, setMovieInfo] = useState();


    useEffect(() => {
        axios.get(`http://www.omdbapi.com/?i=${selectedMovie}&apikey=${API_KEY}`)
            .then((response) => setMovieInfo(response.data));
    }, [selectedMovie]);

    return (
        <>
            <Container>
                {movieInfo ? <>
                    <Wrapper className="Wrapper">
                        <ImageBox>
                            <CoverImage src={movieInfo?.Poster} alt={movieInfo?.Title}></CoverImage>
                        </ImageBox>

                        <div onClick={() => {
                            setFavouriteMovies([...favouriteMovies, movieInfo])
                        }}>Favourite</div>

                        <ContentBox>
                            <Details>{movieInfo?.Type}: <span>{movieInfo?.Title}</span></Details>
                            <Details>IMDB Rating: <span>{movieInfo?.imdbRating}</span></Details>
                            <Details>Released: <span>{movieInfo?.Released}</span></Details>
                            <Details>Genre: <span>{movieInfo?.Genre}</span></Details>
                            <Details>Rated: <span>{movieInfo?.Rated}</span></Details>
                            <Details>Director: <span>{movieInfo?.Director}</span></Details>
                            <Details>Actors: <span>{movieInfo?.Actors}</span></Details>
                            <Details>Plot: <span>{movieInfo?.Plot}</span></Details>
                            <CloseBtn onClick={() => {
                                setSelectedMovie(null)
                                console.log('nnn');
                            }}>X</CloseBtn>




                        </ContentBox>
                    </Wrapper>
                </>
                    : "Loading Please wait..."}

            </Container>
        </>
    )
}
