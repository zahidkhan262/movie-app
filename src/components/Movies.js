import React from 'react';
import styled from 'styled-components';
// import { MoviesDetails } from './MoviesDetails';

const MoviesList = styled.div`
display:flex;
flex-direction:column;
padding:10px;
width: 280px;
box-shadow: 0 0 20px 0 rgba(0,0,0,0.2);
cursor:pointer;
background: #000;
transition:padding 0.3s;
&:hover{
   padding:0 5px;
}
`;

const CoverImage = styled.img`
height: 362px;
`;
const MovieName = styled.span`
font-size:16px;
font-weight:400;
color: #fff;
margin : 15px 0;
white-space: nowrap;
text-overflow: ellipsis;
overflow:hidden;
`;
const MovieColumn = styled.div`
display:flex;
justify-content: space-between;
align-item:center;
`;
const MovieInfo = styled.span`
font-size: 15px;
font-weight: 400;
color:#fff;
text-transform: capitalize;
`;

export const Movies = (props) => {

    const { Title, Year, imdbID, Type, Poster } = props.movie;

    return (
        <>
            <MoviesList className="movie-responsive" onClick={() => props.setSelectedMovie(imdbID)}>
                <CoverImage src={Poster} />
                <MovieName>{Title}</MovieName>
                <MovieColumn>
                    <MovieInfo>Years: {Year}</MovieInfo>
                    <MovieInfo>Type: {Type}</MovieInfo>
                </MovieColumn>
            </MoviesList>
        </>
    )
}
