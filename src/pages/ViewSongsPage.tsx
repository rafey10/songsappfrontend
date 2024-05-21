import { FC, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAvailableSongsAction } from "../songs/songs.actions";
import { selectSongs, setActivePageAction } from "../songs/songsSlice";
import { Button } from "@mui/material";
import styled from "styled-components";
import _ from "lodash";
import SongsTable from "../components/songsTable/SongsTable";

const ButtonContainer = styled.div`
  text-align: right;
  margin: 10px 20px 0px 0px;
  width: 98%;
`;

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

  const handleSubmit = useCallback(() => {
    dispatch(setActivePageAction("submitSongPage"));
  }, [dispatch]);

  return (
    <>
      <Heading>Songs Catalogue</Heading>
      <SubHeading>Click on a Song Name to see the details page.</SubHeading>
      <ButtonContainer>
        {_.isEmpty(songs) && (
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSubmit}
          >
            + Add Song
          </Button>
        )}
      </ButtonContainer>
      <SongsTable songs={songs}></SongsTable>
    </>
  );
};

export default SongsPage;
