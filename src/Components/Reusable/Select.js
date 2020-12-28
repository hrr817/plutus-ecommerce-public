import React from 'react'
import './Select.scss'

import Spinner from './Spinner'

const Select = (props => {
     const { label, name, options, onChange, register, required} = props

     return (
          <div className={props.className ? props.className : 'custom-select'}>
               <div className="label">
                    <label htmlFor="country"> {`${label} ${required && ' *'}`} </label> 
                    {Array.isArray(options)? !options.length && <Spinner/> : !options && <Spinner/>}
               </div>
               <select name={name} onChange={e => onChange(e.target.value)} disabled={!options} ref={register({ required })} required={required}>
                    {
                    Array.isArray(options)? 
                    options.map(({id, description, price}) => 
                         <option key={id} value={description}> {`${description} ${price.formatted_with_symbol}`} </option>
                    ) :
                    options && Object.entries(options).map(([value, name]) => 
                         <option key={value} value={value}> { name } </option>
                    )
                    }
               </select>
          </div>
     )

     
})

export default React.memo(Select)
