import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAvailableSongsAction } from "../songs/songs.actions";
import SongsTable from "../components/SongsTable/SongsTable";
import { selectSongs } from "../songs/songsSlice";
import styled from "styled-components";

const Heading = styled.h2`
  margin: 20px 0px 0px 20px;
  text-align: center;
`;

const SubHeading = styled.p`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 15px 0px 0px 0px;
`;

const SongsPage: FC = () => {
  const songs = useSelector(selectSongs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAvailableSongsAction());
  }, [dispatch]);

  return (
    <>
      <Heading>Songs Catalogue</Heading>
      <SubHeading>Click on a Song Name to see the details page.</SubHeading>
      <SongsTable songs={songs}></SongsTable>
    </>
  );
};

export default SongsPage;
