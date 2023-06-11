import "./App.css";
import { Scorecard } from "./components/Scorecard";

function App() {
  return (
    <div>
      <h1>Bowling Scorecard .com</h1>
      <Scorecard />
      <form>
        <label>
          Number of Pins:
          <input type="number" inputMode="numeric" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default App;
