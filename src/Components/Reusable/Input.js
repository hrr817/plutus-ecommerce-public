import React from 'react'
import './Input.scss'

const Input = (props) => {

     const {type, className, label, name, register, required} = props



     return (
          <div className={className? className : 'custom-input'}>
               <label htmlFor={name}> {`${label} ${label && ' *'}`} </label>
               <input type={type? type : 'text'} name={name} ref={register({ required })} required={required}/>
          </div>
     )
}

export default React.memo(Input)
