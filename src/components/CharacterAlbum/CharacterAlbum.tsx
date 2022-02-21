import { ICharacter } from "../../hooks/useGetCharacters";
import { CharacterCard } from "../CharacterCard/CharacterCard";

interface ICharacterAlbum {
  characters: ICharacter[];
  hasMore: boolean;
  loading: boolean;
  error: boolean;
}

export default function CharacterAlbum({
  characters,
  hasMore,
  loading,
  error,
}: ICharacterAlbum) {
  return (
    <div className="container">
      <div className="row">
        {characters &&
          characters.length > 0 &&
          characters.map((character: ICharacter, characterIndex) => {
            return (
              <CharacterCard
                key={characterIndex}
                id={characterIndex}
                imageURL={character.image}
                characterName={character.name}
                status={character.status}
              />
            );
          })}
        {!hasMore ? (
          <p data-testid="no-more-characters">No more characters</p>
        ) : loading ? (
          <p data-testid="loading">Loading</p>
        ) : (
          error && <p data-testid="error">Error</p>
        )}
      </div>
    </div>
  );
}
