import { FC, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSelectedSong, setActivePageAction } from "../songs/songsSlice";
import styled from "styled-components";
import { Button } from "@mui/material";
import SongsTable from "../components/songsTable/SongsTable";

const ButtonContainer = styled.div`
  text-align: right;
  margin: 0px 20px 0px 0px;
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
  padding-bottom: 10px;
`;

const ShowSongDetailsPage: FC = () => {
  const selectedSong = useSelector(selectSelectedSong);
  const songs = selectedSong ? [selectedSong] : [];
  const dispatch = useDispatch();
  const handleBackToHomePageClick = useCallback(() => {
    dispatch(setActivePageAction("entryPage"));
  }, [dispatch]);
  return (
    <>
    <Heading> Song Details Page</Heading>
    <SubHeading>You can view the Song details here</SubHeading>
      <SongsTable songs={songs}></SongsTable>
      <ButtonContainer>
        <Button
          variant="contained"
          color="inherit"
          size="large"
          onClick={handleBackToHomePageClick}
        >
          Back to HomePage
        </Button>
      </ButtonContainer>
    </>
  );
};
export default ShowSongDetailsPage;
