import ReactDOM from "react-dom";
import App from "./App";

it("App renders without crashing", async () => {
  const div = await document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
