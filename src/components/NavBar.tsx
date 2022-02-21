import logo from "../assets/logo.png";

export default function NavBar() {
  return (
    <nav className="navbar navbar-dark bg-dark px-3 d-flex justify-content-center">
      <img
        src={logo}
        className="d-flex justify-content-center navbar-logo"
        alt="RickAndMorty logo"
      />
    </nav>
  );
}
