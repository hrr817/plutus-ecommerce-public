import React, { memo } from 'react'
import './ModelBox.scss'

// Container
const ModelBox = memo(props => {
     let style = null

     if(props) {
          style = {
               width: props.width? props.width : '85%',
               maxWidth: props.maxWidth? props.maxWidth : '1200px'
          }
     }

     return (
          <div className={props.className? props.className : `model-box${props.theme? ' ' + props.theme : ''}` } style={style}>
               {props.children}
          </div>
     )
})

// Header
const Header = memo(props => {
     return (
          <h3 className="header">
               {props.children}
          </h3>
     )
})

// Section
const Section = memo(props => {


     return (
          <section className={props.className ? props.className : 'section'} 
          style={props.center && {justifyContent: 'center', alignItems: 'center'}}>
               {props.children}
          </section>
     )
})

const Form = memo(props => {

     const {action, onSubmit, className} = props

     return (
          <form className={className? className : 'section'} action={action && action} onSubmit={onSubmit && onSubmit()}>
               {props.children}
          </form>
     )
})


ModelBox.Header = Header
ModelBox.Section = Section
ModelBox.Form = Form
export { ModelBox }
