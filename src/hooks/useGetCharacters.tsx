import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { axiosInstance } from "../api/axios";
import { formulateURL } from "../helpers";

interface ILocation {
  name: string;
  url: string;
}

export interface ICharacter {
  id: number;
  created: string;
  episode: string[];
  gender: string;
  image: string;
  location: ILocation;
  name: string;
  origin: ILocation;
  species: string;
  status: string;
  type: string;
  url: string;
}

interface IData {
  characters: ICharacter[];
  searchQuery: string;
  filterQuery: string;
  page: number;
}

interface IStateData {
  loading: boolean;
  error: boolean;
  hasMore: boolean;
}

export function useGetCharacters() {
  const [data, setData] = useState<IData>({
    characters: [],
    searchQuery: "",
    filterQuery: "all",
    page: 1,
  });

  const [dataState, setDataState] = useState<IStateData>({
    loading: false,
    error: false,
    hasMore: true,
  });

  const fetchCharacters = () => {
    //if we are loading new content dont make new requests
    if (dataState.loading) return;
    //prepareing the state for new fetch
    setDataState({ ...dataState, loading: true, error: false, hasMore: true });
    //making the query from the data parametars we have
    //we are making new reuqest with new parametars so we need to get the first page with the filtered content
    const query = formulateURL(data.searchQuery, data.filterQuery, data.page);
    axiosInstance
      .get(query)
      .then((response: AxiosResponse) => {
        console.log(response);
        //get the character data
        const charactersData = response.data.results;
        //if the last batch we got had less then 20 characters, there is no more characters to fetch
        const lastBatch = response.data.results.length < 20;
        //change the state after successful fetch
        setDataState({ ...dataState, loading: false, hasMore: !lastBatch });
        //add new data to the array and change the current page
        setData({
          ...data,
          characters: [...data.characters, ...charactersData],
          page: data.page + 1,
        });
      })
      .catch((error: AxiosError) => {
        //if something went wrong with the request we set state to reflect on the error
        setDataState({ loading: false, hasMore: false, error: true });
      });
  };

  //this useeffect is similar to the fetchCharacters(), we use this one when user changes search query or changes category
  useEffect(() => {
    if (dataState.loading) return;
    setDataState({ ...dataState, hasMore: true });
    const query = formulateURL(data.searchQuery, data.filterQuery, 1);
    axiosInstance
      .get(query)
      .then((response: AxiosResponse) => {
        const charactersData = response.data.results;
        const lastBatch = response.data.results.length < 20;
        setData({ ...data, characters: [...charactersData], page: 2 });
        setDataState({ ...dataState, loading: false, hasMore: !lastBatch });
      })
      .catch((error: AxiosError) => {
        setDataState({ loading: false, hasMore: false, error: true });
        setData({ ...data, characters: [] });
      });
  }, [data.searchQuery, data.filterQuery]);

  //handles search by name
  function handleChangeSearchQuery(query: string) {
    setData({ ...data, searchQuery: query });
  }

  //handles filter change
  function handleChangeFilterQuery(query: string) {
    setData({ ...data, filterQuery: query });
  }

  return {
    data,
    fetchCharacters,
    handleChangeSearchQuery,
    handleChangeFilterQuery,
    dataState,
  };
}
