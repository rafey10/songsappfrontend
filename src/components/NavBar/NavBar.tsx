import { FC, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  NAV_BAR_CONTENT_HEIGHT,
  NAV_BAR_CONTENT_HEIGHT_MOBILE,
  SPACINGS,
  TABLE_BREAKPOINT,
} from "../../styles/constants";
import { rem } from "polished";
import { ReactComponent as ICELogo } from "../../ice_logo.svg";
import { Link } from "react-router-dom";
import { Search, StrictSearchProps } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectActivePage,
  selectIsSearchLoading,
  setActivePageAction,
  setIsSearchLoadingAction,
  setSearchTermAction,
} from "../../songs/songsSlice";
import { useDebounce } from "usehooks-ts";
import { fetchAvailableSongsAction } from "../../songs/songs.actions";

export const Container = styled.div`
  flex-shrink: 0;
  position: fixed;
  width: 100%;
  top: 0;
  background-color: black;
  z-index: 20;
`;

export const HeaderContainer = styled.header`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  height: ${NAV_BAR_CONTENT_HEIGHT_MOBILE}px;
  justify-content: space-between;
  @media (min-width: ${NAV_BAR_CONTENT_HEIGHT}px) {
    height: 80px;
  }
`;

export const LeftContainer = styled.div`
  align-items: center;
  display: flex;
  padding: 0 ${SPACINGS.small}px;
  @media (min-width: ${TABLE_BREAKPOINT}px) {
    padding: 0 ${SPACINGS.large}px;
  }
`;

export const LogosLink = styled.div`
  align-items: center;
  display: flex;
  gap: ${rem("8px")};

  @media (min-width: ${TABLE_BREAKPOINT}px) {
    gap: ${rem("24px")};
  }
`;

export const StyledICELogo = styled(ICELogo)`
  cursor: pointer;
  height: 24px;
  width: auto;
  @media (min-width: ${TABLE_BREAKPOINT}px) {
    height: 36px;
  }
`;

export const SongsAppLogo = styled(Link)`
  font-size: ${rem("16px")};
  font-weight: 700;
  word-spacing: -2px;
  color: lightBlue;
  margin: 0;
  text-decoration: none;

  @media (min-width: ${TABLE_BREAKPOINT}px) {
    font-size: 20px;
  }

  &:hover {
    text-decoration: underline;
  }
`;

export const Separator = styled.span`
  background-color: white;
  height: 36px;
  width: 3px;
`;

export const LongSearch = styled(Search)`
  input {
    width: 600px;
    padding: 10px 10px 10px 10px;
    margin: 18px 20px;
  }
`;

const NavBar: FC = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTermState] = useState<string | undefined>();
  const isSearchLoading = useSelector(selectIsSearchLoading);
  const activePage = useSelector(selectActivePage);
  // Prevents NavBar from triggering a fetchSong action upon page loading
  const hasUserInteracted = useRef(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const handleSearchChange: StrictSearchProps["onSearchChange"] = (
    event,
    data
  ) => {
    const searchTerm = data.value;
    setSearchTermState(searchTerm);
    hasUserInteracted.current = true;
  };

  useEffect(() => {
    if (hasUserInteracted.current) {
      if (debouncedSearchTerm) {
        dispatch(setSearchTermAction(debouncedSearchTerm));
        dispatch(fetchAvailableSongsAction(undefined));
        dispatch(setIsSearchLoadingAction(false));
      } else {
        dispatch(setSearchTermAction(undefined));
        // to be changed to fetch song Action
        dispatch(fetchAvailableSongsAction(undefined));
      }
    }
  }, [dispatch, debouncedSearchTerm]);

  return (
    <Container>
      <HeaderContainer>
        <LeftContainer>
          <LogosLink>
            <StyledICELogo />
            <Separator />
            <SongsAppLogo
              to="/"
              onClick={() => dispatch(setActivePageAction("entryPage"))}
            >
              Music Library
            </SongsAppLogo>
          </LogosLink>
        </LeftContainer>
        {activePage === "entryPage" && (
          <LongSearch
            placeholder="Search by Artist Name or Release Year"
            loading={isSearchLoading}
            onSearchChange={handleSearchChange}
            value={searchTerm}
            showNoResults={false}
          />
        )}
      </HeaderContainer>
    </Container>
  );
};

export default NavBar;
