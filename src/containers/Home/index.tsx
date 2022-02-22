import React, { useCallback, useEffect } from "react";
import "./home.css";
import CharacterAlbum from "../../components/CharacterAlbum/CharacterAlbum";
import FloatingFilters from "../../components/FloatingFilters/FloatingFilters";
import NavBar from "../../components/NavBar";
import { useGetCharacters } from "../../hooks/useGetCharacters";

export default function Home() {
  const {
    data,
    filters,
    fetchCharacters,
    handleChangeSearchQuery,
    handleChangeFilterQuery,
    dataState,
  } = useGetCharacters();

  function handleSearch(e: React.FormEvent<HTMLInputElement>) {
    window.scrollTo({
      top: 0,
    });
    handleChangeSearchQuery(e.currentTarget.value);
  }

  function handleRadioButtonChange(e: React.FormEvent<HTMLInputElement>) {
    window.scrollTo({
      top: 0,
    });
    handleChangeFilterQuery(e.currentTarget.id);
  }

  const fetchCallback = useCallback(() => {
    fetchCharacters();
  }, [fetchCharacters]);

  useEffect(() => {
    fetchCallback();
  }, []);

  useEffect(() => {
    const onScrollFetch = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 10
      ) {
        if (dataState.hasMore) fetchCharacters();
      }
    };

    window.addEventListener("scroll", onScrollFetch);
    return () => window.removeEventListener("scroll", onScrollFetch);
  }, [fetchCharacters, dataState.hasMore]);

  return (
    <div data-testid={"main-container"} className="Home">
      <NavBar />
      <FloatingFilters
        filterQuery={filters.filterQuery}
        handleRadioButtonChange={handleRadioButtonChange}
        handleSearch={handleSearch}
      />
      <CharacterAlbum
        characters={data.characters}
        hasMore={dataState.hasMore}
        loading={dataState.loading}
        error={dataState.error}
      />
    </div>
  );
}
