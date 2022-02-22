import logo from "../../assets/logo.png";

export interface ICharacterCard {
  id: number;
  imageURL: string;
  characterName: string;
  status: string;
}

export function CharacterCard({
  id,
  imageURL,
  characterName,
  status,
}: ICharacterCard) {
  return (
    <div
      data-testid={`card-list-element-${id}`}
      className="col-12 col-sm-6 col-md-4 p-4 col-lg-3 card-hover"
    >
      <div className="card">
        <img
          data-testid="card-image"
          src={imageURL}
          alt={logo}
          className="card-img-top"
        />
        <div className="card-body">
          <h5 data-testid="card-name" className="card-title">
            {characterName}
          </h5>
          <p data-testid="card-status" className="card-text">
            {status}
          </p>
        </div>
      </div>
    </div>
  );
}
