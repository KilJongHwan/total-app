import React from "react";
import styled from "styled-components";
const MovieCardView = ({
  rank,
  image,
  title,
  score,
  rate,
  reservation,
  date,
}) => {
  return (
    <CardView>
      <Ranking>{rank}</Ranking>
      <Poster src={image} alt={`${title} 포스터`} />
      <Title>{title}</Title>
      <Rating>평점 : {score}</Rating>
      <Participants>{rate}</Participants>
      <ReservationRate>예매율 : {reservation}</ReservationRate>
      <ReleaseDate>개봉일 : {date}</ReleaseDate>
    </CardView>
  );
};

const CardView = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  width: 200px;
  height: 350px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  line-height: 1.1;
`;

const Ranking = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px;
  top: 10px;
  left: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 1.2rem;
  font-weight: bold;
  border-radius: 5px 0 0 0;
`;

const Poster = styled.img`
  width: 100%;
  height: 65%;
  object-fit: cover;
  border-radius: 5px;
`;

const Title = styled.h3`
  margin: 10px 0;
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 200px; /* adjust this value to your liking */
`;

const Rating = styled.div`
  margin-bottom: 5px;
  font-size: 1.2rem;
  font-weight: bold;
  color: black;
`;

const Participants = styled.div`
  margin-bottom: 5px;
  font-size: 0.8rem;
  color: black;
`;

const ReservationRate = styled.div`
  margin-bottom: 5px;
  font-size: 0.8rem;
  color: balck;
`;

const ReleaseDate = styled.div`
  font-size: 0.8rem;
  color: black;
`;

export default MovieCardView;
