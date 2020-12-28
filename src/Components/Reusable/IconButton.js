import React from 'react'
import './IconButton.scss'

export const IconButton = React.memo((props) => {
     return (
          <div className={`icon-button ${props.className}`} onClick={() => props.onClick()}>
               {props.icon}
          </div>
     )
})

