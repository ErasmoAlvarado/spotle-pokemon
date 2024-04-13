import React, { useState, useEffect, useMemo } from 'react';
import "./CardPokemonList.css"
import { usePokemonName } from '../providers/usePokemonName';
import axios from 'axios';
import { useCounter } from '../providers/useCounter';
import { useRandomPokemon } from '../providers/useRandomPokemon'
import { setVariable } from '../functions/setVariable';
import ArrowComponent from './ArrowComponent';



export default function CardPokemonList() {
  const [answer, setAnswer] = useState([])
  const [currentPokemon, setCurrentPokemon] = useState([]);
  const pokemonNameData = usePokemonName((state)=>state.name)
  const counterUpdate = useCounter((state)=>state.update)
  const ramdonData = useRandomPokemon((state)=>state.data); 
  const pokemonNameDataUpdate = usePokemonName((state)=>state.pokemonUpdate)
  const resetCounter = useCounter((state)=>state.reset)
  useEffect(() => {
     async function fetchData() {
      if (pokemonNameData !== "") {
        try {
          const [pokemonResponse, formResponse] = await Promise.all([
            axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonNameData}`),
            axios.get((await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonNameData}`)).data["forms"][0]["url"])
          ]);
          const data = [pokemonResponse.data, formResponse.data];
          const type2 = data[0].types[1]?.type.name ?? "empty"
          const type1 = data[0].types[0].type.name;
          const name = data[0].name;
          const photo = data[0].sprites.front_default;
          const height = (data[0].height/10) 
          const weight = (data[0].weight/10) 
          const id = data[0].id;
          const game = data[1].version_group.name
          
          setCurrentPokemon(prevPokemon => [
            {
              name,
              photo,
              type1,
              type2,
              game,
              height,
              weight,
              id
            },
            ...prevPokemon
          ]);
          counterUpdate()
          let temp = {}
            temp["game"] = (ramdonData.game == game)
            temp["type1"] = (ramdonData.type1 == type1)
            temp["type2"] = (ramdonData.type2 == type2)
            temp["id"] = setVariable(ramdonData["id"],id,25)
            temp["weight"] = setVariable(ramdonData["weight"],weight,5)
            temp["height"] = setVariable(ramdonData["height"],height,0.4)
            setAnswer([temp,...answer])
            pokemonNameDataUpdate("")
        } catch (error) {
          pokemonNameDataUpdate("pikachu")
          console.error(error);
        }
      }
    }
    fetchData();
  }, [pokemonNameData]);

  const pokemonList = useMemo(() => currentPokemon.map((data, index) => {
    let gameStyle = answer[index].game ?'smallCard correct':'smallCard adjust'
    let type1Style = answer[index].type1 ?'smallCard correct':'smallCard'
    let type2Style = answer[index].type2 ?'smallCard correct':'smallCard'
    return (
      <li key={index} className='guess'>
        <div className='pokemon-information'>
          <div className='image-container'>
            <img src={data.photo} alt={data.name} loading="lazy" />
          </div>
          <p>{data.name}</p>
        </div>
        <div className='rows'>
          <div className={answer[index].id}> 
            <p>Podedex</p>
            <div className='arrowTitle'>
              <p className='title'>{data.id}</p>
              <ArrowComponent data={data.id} ramdonData={ramdonData["id"]}></ArrowComponent>
             </div>
          </div>
          <div className={type1Style}>
            <p>Type 1</p>
            <p className='title'>{data.type1}</p>
          </div>
          <div className={type2Style}>
            <p>Type 2</p>
            <p className='title'>{data.type2}</p>  
          </div>
        </div>
        <div className='rows'>
          <div className={answer[index].height}>
            <p>height</p>
            <div className='arrowTitle'>
              <p className='title'>{data.height + "m"}</p>
              <ArrowComponent data={data.height} ramdonData={ramdonData["height"]}></ArrowComponent>
             </div>
          </div>
          <div className={answer[index].weight}>
             <p>weight</p>
             <div className='arrowTitle'>
              <p className='title'>{data.weight + "kg"}</p>
              <ArrowComponent data={data.weight} ramdonData={ramdonData["weight"]}></ArrowComponent>
             </div>
          </div>
          <div className={gameStyle}>
            <p>game</p>
            <p className='title'>{data.game}</p>
          </div>
        </div>
      </li>
    )
  }), [currentPokemon]);
  const fetch = useRandomPokemon((state)=>state.fetch);
  return (
    <div>
      {
        currentPokemon.length < 10
        ?<section>
            {
              (currentPokemon[0]?.id || -1) !=  ramdonData["id"]
              ?<></>
              :<div className='winner'>
                <div className='winner_center'>
                    <div className='winnerCard'>
                      <h1>Congrats!</h1>
                      <img src={ramdonData.photo}></img>
                      <button onClick={()=>{
                      fetch()
                      setCurrentPokemon([])
                      resetCounter()
                    }}>restart</button>
                    </div>
                </div>
              </div>
            }
           <ul>{pokemonList}</ul>
        </section>
        :<div className='lose'>
          <p className='title
          '>You lose :(</p>
          <div className='image-container'>
            <img src={ramdonData.photo}></img>
          </div>
          <p className='name'>{ramdonData.name}</p>
          <button onClick={()=>{
            fetch()
            setCurrentPokemon([])
            resetCounter()
          }}>restart</button>
        </div>
      }
    </div>
  );
}
