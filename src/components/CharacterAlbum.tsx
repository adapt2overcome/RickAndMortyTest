import { ICharacter } from "../hooks/useGetCharacters";
import { CharacterCard } from "./CharacterCard";

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
                imageURL={character.image}
                characterName={character.name}
                status={character.status}
              />
            );
          })}
        {!hasMore ? (
          <p>No more characters</p>
        ) : loading ? (
          <p>Loading</p>
        ) : (
          error && <p>Error</p>
        )}
      </div>
    </div>
  );
}
