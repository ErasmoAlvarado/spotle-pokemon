import GameComponent from "./components/GameComponent"
import "./App.css"
import Navbar from "./components/Navbar"
import { useEffect } from "react"
import { useRandomPokemon } from "./providers/useRandomPokemon";

function App() {
  const fetch = useRandomPokemon((state)=>state.fetch);
  useEffect( () => {
    fetch()
  }, [])
  return (
    <>
      <Navbar></Navbar>
      <div className="center">
        <div className="content">
          <GameComponent></GameComponent>
        </div>
      </div>
    </>
  )
}

export default App
