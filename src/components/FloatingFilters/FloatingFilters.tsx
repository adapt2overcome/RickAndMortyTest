import { useState, useEffect } from "react";

interface IFloatingFilters {
  filterQuery: string;
  handleRadioButtonChange: (e: React.FormEvent<HTMLInputElement>) => void;
  handleSearch: (e: React.FormEvent<HTMLInputElement>) => void;
}

export default function FloatingFilters({
  filterQuery,
  handleRadioButtonChange,
  handleSearch,
}: IFloatingFilters) {
  const [menuColor, setMenuColor] = useState("p-3 bg-dark rounded");

  const onScrollChangeColor = () => {
    if (window.pageYOffset > 70) setMenuColor("p-3 menu-transparent rounded");
    else setMenuColor(`p-3 bg-dark rounded`);
    window.addEventListener("scroll", onScrollChangeColor);
    return () => window.removeEventListener("scroll", onScrollChangeColor);
  };

  useEffect(() => {
    onScrollChangeColor();
  }, []);

  return (
    <div className="container mt-2 sticky-menu">
      <div className={menuColor}>
        <div className="row">
          <div className="col-sm align-items-center align-self-center">
            <label className="text-light d-inline-block me-2">Status:</label>
            <div className="form-check d-inline-block m-2">
              <input
                className="form-check-input"
                type="radio"
                checked={filterQuery === "all"}
                onChange={handleRadioButtonChange}
                name="flexRadioDefault"
                id="all"
              />
              <label className="form-check-label text-light">All</label>
            </div>
            <div className="form-check d-inline-block m-2">
              <input
                className="form-check-input d-inline-block"
                type="radio"
                checked={filterQuery === "Alive"}
                onChange={handleRadioButtonChange}
                name="flexRadioDefault"
                id="Alive"
              />
              <label className="form-check-label text-light">Alive</label>
            </div>
            <div className="form-check d-inline-block m-2">
              <input
                className="form-check-input"
                type="radio"
                checked={filterQuery === "Dead"}
                onChange={handleRadioButtonChange}
                name="flexRadioDefault"
                id="Dead"
              />
              <label className="form-check-label text-light">Dead</label>
            </div>
            <div className="form-check d-inline-block m-2">
              <input
                className="form-check-input"
                type="radio"
                checked={filterQuery === "unknown"}
                onChange={handleRadioButtonChange}
                name="flexRadioDefault"
                id="unknown"
              />
              <label className="form-check-label text-light">Unknown</label>
            </div>
          </div>
          <div className="d-flex col-sm justify-content-center">
            <div className="input-group rounded max-size-search">
              <input
                type="search"
                className="form-control rounded"
                placeholder="Search character name"
                aria-label="Search"
                aria-describedby="search-addon"
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
