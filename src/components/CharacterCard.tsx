import logo from "../assets/logo.png";

export interface ICharacterCard {
  imageURL: string;
  characterName: string;
  status: string;
}

export function CharacterCard({
  imageURL,
  characterName,
  status,
}: ICharacterCard) {
  return (
    <div className="col-12 col-sm-6 col-md-4 p-4 col-lg-3">
      <div className="card">
        <img src={imageURL} alt={logo} className="card-img-top" />
        <div className="card-body">
          <h5 className="card-title">{characterName}</h5>
          <p className="card-text">{status}</p>
        </div>
      </div>
    </div>
  );
}
