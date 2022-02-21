import App from "./App";
import { render } from "@testing-library/react";

it("App renders without crashing nad renders list element after axios fetch", async () => {
  const mainContainer = render(<App />);

  const firstAlbumCharacter = await mainContainer.findByTestId(
    "card-list-element-1"
  );
  expect(firstAlbumCharacter).toBeInTheDocument();
});
