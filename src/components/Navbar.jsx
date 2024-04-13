import React from 'react'
import "./Navbar.css"
import pokeball from '../assets/pokeball.png'
import github from '../assets/github.svg'
import linkedin from '../assets/linkedin.svg'
import { useEffect } from 'react'

export default function Navbar() {
  useEffect( () => {
  }, [])
  return (
    <header className='head'>
      <div>
        <img className='logo' src={pokeball}></img>
      </div>
      <div style={{display: 'flex', alignItems: 'center', gap: 20}}>
        <a href='https://github.com/ErasmoAlvarado'>
         <img loading='lazy' className='help' src={github}></img>
        </a>
        <a href='https://ve.linkedin.com/in/erasmo-alvarado-49800a241'>
          <img loading='lazy' className='help' src={linkedin}></img>
        </a>
      </div>
    </header>
  )
}
