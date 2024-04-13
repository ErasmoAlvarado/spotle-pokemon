import React from 'react';
import down from '../assets/keyboard_down.svg'
import up from '../assets/keyboard_up.svg'

function ArrowComponent(props) {
  if (props.data > props.ramdonData) {
    return <img className='arrow' src={down} loading='lazy' alt="Down Arrow" />;
  } else if (props.data < props.ramdonData) {
    return <img className='arrow' src={up} loading='lazy' alt="Up Arrow" />;
  } else {
    return <span></span>;
  }
}

export default ArrowComponent;
