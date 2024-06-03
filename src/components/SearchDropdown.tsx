import { useState, useRef, Dispatch, SetStateAction } from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { NameModel } from "../models/NameModel";
import { PlayerModel } from "../models/PlayerModel";
import { Form } from "react-bootstrap";
import { GetAsync } from "./Globals";

type Props = {
  setPlayerList: Dispatch<SetStateAction<PlayerModel[]>>;
};

/**
 * Used to autocomplete user input with QB names. Once
 * a player is selected, the player list will update
 * @param setPlayerList Used to update the player list with
 * new QB entries
 */
function SearchDropdown({ setPlayerList }: Props) {
  // loads the autocomplete bar when fetching player names
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // names and id pairs that match the user input
  const [playerSuggestions, setPlayerSuggestions] = useState<NameModel[]>([]);
  // stores the user input
  const dropdownRef = useRef(null);

  /**
   * Once the user selects a dropdown option, the option's mapped playerId
   * will be used to request additional player data
   * @param playerId: Id of a player
   */
  const addPlayer = async (playerId: string): Promise<void> => {
    const playerData = await GetAsync<PlayerModel>(
      `api/players/player/${playerId}`
    );
    setPlayerList((currPlayerList) => [...currPlayerList, playerData]);
    dropdownRef.current.clear();
  };

  /**
   * Upon the user entering a player's name in the dropdown, it
   * will fetch any players whose name matches the user's input
   * @param query
   */
  const handleSearch = async (query: string): Promise<void> => {
    setIsLoading(true);
    try {
      const playerNames = await GetAsync<NameModel[]>(`api/players/${query}`);
      setPlayerSuggestions(playerNames);
    } catch (e) {
      console.log(e.message);
    }
    setIsLoading(false);
  };

  return (
    <Form.Group controlId="player">
      <Form.Label>Player Name</Form.Label>
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
    </Form.Group>
  );
}

export default SearchDropdown;
