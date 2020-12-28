import React from 'react'
import './Loading.scss'

const Loading = React.memo(({value, theme}) => {
     return (
          <div className={`loading span-grid ${theme && theme}`}> 
               {value? value : 'Loading'}
               <span className="dot1">.</span>
               <span className="dot2">.</span>
               <span className="dot3">.</span>
          </div>
     )
})

export default Loading
