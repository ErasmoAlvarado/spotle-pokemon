import React from 'react'
import './GameComponent.css'
import { useState } from 'react'
import { useEffect } from 'react'
import { getPokemonData } from "../functions/getPokemonData"
import CardPokemonList from './CardPokemonList'
import { useCounter } from '../providers/useCounter'
import { usePokemonName } from '../providers/usePokemonName'


export default function GameComponent() {
  const [PokemonList, setPokemonList] = useState("")
  const [pokemonText,setPokemonText]= useState("")
  const counterData = useCounter((state)=>state.counter)
  const pokemonNameData = usePokemonName((state)=>state.pokemonUpdate)
  useEffect(()=> {
    async function fetchData(){
      try {
        const data = await getPokemonData()
        setPokemonList(data)
      } catch (error) {
        console.error(error)
      }
     }
     fetchData()
  }, [])
  if (PokemonList.length == 0 )return <div></div>
  const searchListCondition = PokemonList.filter((data)=>{return data[0].startsWith(pokemonText.toLowerCase())}).length > 1000
  || pokemonText.length < 3
  || PokemonList.filter((data)=>{return data[0].startsWith(pokemonText.toLowerCase())}).length < 1
 return (
    <div>
        <div className='search-container'>
        <p className='greeting'>
          🐉 Who's that pokemon!!
          <a href='https://github.com/ErasmoAlvarado'>erasmo.dev</a>
        </p>
        <div className='left'>
          <p>Guess {counterData+1} of 10</p>
        </div>
        <input value={pokemonText} onChange={(e)=>{setPokemonText(e.target.value)}} placeholder="Search Pokemon" type="text" name="text" className='input'></input>
        {
          searchListCondition
          ?<div></div>
          :<div className='result'>
          <ul>
            {
              PokemonList.filter((data)=>{return data[0].startsWith(pokemonText.toLowerCase())}).map((data,index)=>{
                return <li className='searchItems' onClick={()=>{
                  pokemonNameData(data[0])
                  setPokemonText("")
                 }} key={index}>{data[0]}</li>
              })
            }
          </ul>
        </div>
        }
      </div>
      <CardPokemonList ></CardPokemonList>
    </div>
  )
}
