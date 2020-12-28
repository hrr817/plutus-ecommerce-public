import React from 'react'
import './Navigation.scss'

const Navigation = (props) => {
     return (
          <nav className={`navigation ${props.theme && props.theme}`}>
               {props.children}
          </nav>
     )
}

const Box = ({children}) => {
     return (
          <div className={`box`}>
               {children}
          </div>
     )
}

const Item = (props) => {
     return (
          <div className={`item`}>
               {props.children}
          </div>
     )
}


const Logo = (props) => {
     return (
          <span className={`logo`}>
               {props.children}
          </span>
     )
}

const Link = (props) => {
     return (
          <a href={props.href} className={`link`}>
               {props.children}
          </a>
     )
}

Navigation.Logo = Logo;
Navigation.Item = Item;
Navigation.Box = Box;
Navigation.Link = Link;

export { Navigation }
