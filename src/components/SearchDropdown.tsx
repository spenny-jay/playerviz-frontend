import { useState, useRef, Dispatch, SetStateAction } from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { NameModel } from "../models/NameModel";
import { PlayerModel } from "../models/PlayerModel";

type Props = {
  setPlayerList: Dispatch<SetStateAction<PlayerModel[]>>;
};

function SearchDropdown({ setPlayerList }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [playerSuggestions, setPlayerSuggestions] = useState([]);
  const dropdownRef = useRef(null);

  const addPlayer = async (playerId: string) => {
    const res = await fetch(
      `http://${process.env.REACT_APP_BACKEND_API}/api/players/player/${playerId}`
    );

    const playerData: PlayerModel = await res.json();
    console.log(playerData);
    setPlayerList((currPlayerList) => [...currPlayerList, playerData]);
    dropdownRef.current.clear();
  };

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `http://${process.env.REACT_APP_BACKEND_API}/api/players/${query}`
      );

      const playerNames: NameModel[] = await res.json();
      setPlayerSuggestions(playerNames);
    } catch (e) {
      console.log(e.message);
    }
    setIsLoading(false);
  };

  return (
    <AsyncTypeahead
      id="async-example"
      isLoading={isLoading}
      labelKey={(option) => `${option["Player"]}`}
      minLength={3}
      onSearch={handleSearch}
      filterBy={["Player"]}
      placeholder="Search for an NFL player..."
      options={playerSuggestions}
      onChange={(selected: NameModel[]) => addPlayer(selected[0]?.Id)}
      ref={dropdownRef}
    />
  );
}

export default SearchDropdown;
