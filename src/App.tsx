import React, { useEffect } from "react";
import "./App.css";

import CharacterAlbum from "./components/CharacterAlbum";
import FloatingFilters from "./components/FloatingFilters";
import NavBar from "./components/NavBar";
import { useGetCharacters } from "./hooks/useGetCharacters";

export default function App() {
  const {
    data,
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

  useEffect(() => {
    fetchCharacters();
  }, []);

  useEffect(() => {
    const onScrollFetch = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 10
      ) {
        console.log(dataState.hasMore);
        if (dataState.hasMore) fetchCharacters();
      }
    };

    window.addEventListener("scroll", onScrollFetch);
    return () => window.removeEventListener("scroll", onScrollFetch);
  }, [fetchCharacters]);

  return (
    <div className="App">
      <NavBar />
      <FloatingFilters
        filterQuery={data.filterQuery}
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
