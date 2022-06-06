import "./App.css";
import React from "react";
import PokemonJourney from "./Dialogs/PokemonJourney";
import { Images } from "./helper/ImageHelper";

const styles = {
  backgroundImage: `url(${Images.PokemonPhoto})`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  width: "100vw",
  height: "100vh",
};

function App() {
  return (
    <div style={styles}>
      <PokemonJourney />
    </div>
  );
}

export default App;
