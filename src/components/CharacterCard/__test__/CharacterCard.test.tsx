import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { CharacterCard } from "../CharacterCard";

test("are image and texts being rendered right", () => {
  const component = render(
    <CharacterCard
      id={1}
      imageURL={`${process.env.REACT_APP_API_ROOT_URL}character/avatar/2.jpeg`}
      characterName="Morty Smith"
      status="Alive"
    />
  );
  const mainContainer = component.queryByTestId("card-list-element-1");
  expect(mainContainer).toBeInTheDocument();
  const imageComponent = component.queryByTestId("card-image");
  expect(imageComponent).toHaveAttribute(
    "src",
    `${process.env.REACT_APP_API_ROOT_URL}character/avatar/2.jpeg`
  );
  const nameField = component.queryByTestId("card-name");
  expect(nameField).toBeInTheDocument();
  expect(nameField).toHaveTextContent("Morty Smith");
  const statusField = component.queryByTestId("card-status");
  expect(statusField).toBeInTheDocument();
  expect(statusField).toHaveTextContent("Alive");
});
