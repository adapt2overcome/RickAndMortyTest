import CharacterAlbum from "../CharacterAlbum";
import { cleanup, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

test("is the right status message being displayed", () => {
  //no message displayed
  let component = render(
    <CharacterAlbum
      characters={[]}
      loading={false}
      error={false}
      hasMore={true}
    />
  );
  let noMoreCharactersParagraph = component.queryByTestId("no-more-characters");
  let loadingParagraph = component.queryByTestId("loading");
  let errorParagraph = component.queryByTestId("error");
  expect(noMoreCharactersParagraph).not.toBeInTheDocument();
  expect(loadingParagraph).not.toBeInTheDocument();
  expect(errorParagraph).not.toBeInTheDocument();

  cleanup();

  //loading message displayed
  component = render(
    <CharacterAlbum
      characters={[]}
      loading={true}
      error={false}
      hasMore={true}
    />
  );
  noMoreCharactersParagraph = component.queryByTestId("no-more-characters");
  loadingParagraph = component.queryByTestId("loading");
  errorParagraph = component.queryByTestId("error");
  expect(noMoreCharactersParagraph).not.toBeInTheDocument();
  expect(loadingParagraph).toBeInTheDocument();
  expect(errorParagraph).not.toBeInTheDocument();

  cleanup();

  //error message displayed
  component = render(
    <CharacterAlbum
      characters={[]}
      loading={false}
      error={true}
      hasMore={true}
    />
  );
  noMoreCharactersParagraph = component.queryByTestId("no-more-characters");
  loadingParagraph = component.queryByTestId("loading");
  errorParagraph = component.queryByTestId("error");
  expect(noMoreCharactersParagraph).not.toBeInTheDocument();
  expect(loadingParagraph).not.toBeInTheDocument();
  expect(errorParagraph).toBeInTheDocument();

  cleanup();

  //no more characters message displayed
  component = render(
    <CharacterAlbum
      characters={[]}
      loading={false}
      error={false}
      hasMore={false}
    />
  );
  noMoreCharactersParagraph = component.queryByTestId("no-more-characters");
  loadingParagraph = component.queryByTestId("loading");
  errorParagraph = component.queryByTestId("error");
  expect(noMoreCharactersParagraph).toBeInTheDocument();
  expect(loadingParagraph).not.toBeInTheDocument();
  expect(errorParagraph).not.toBeInTheDocument();
});
