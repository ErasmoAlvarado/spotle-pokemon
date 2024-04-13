import axios from 'axios';
import { create } from 'zustand';

export const useRandomPokemon = create((set) => ({
  data: {},
  fetch: async () => {
    const index = Math.floor(Math.random() * 1000) + 1;
    const responsePokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${index}`);
    const responseForm = await axios.get(responsePokemon.data.forms[0].url);
    const data = [responsePokemon.data, responseForm.data];
    const type2 = data[0].types[1]?.type.name || 'empty';
    const type1 = data[0].types[0].type.name;
    const name = data[0].name;
    const height = (data[0].height / 10) 
    const weight = (data[0].weight / 10)
    const photo = data[0].sprites.front_default; 
    const id = data[0].id;
    const game = data[1].version_group.name;
    set({
      data : { 
        index,
        type1,
        type2,
        name,
        photo,
        height,
        weight,
        id,
        game
      }
    }); 
  },
}));