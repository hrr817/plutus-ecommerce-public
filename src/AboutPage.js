import React from 'react'

const AboutPage = () => {
     return (
          <div style={{margin: '1em auto', padding: '1em',maxWidth: '400px'}}>
               <h1> About </h1>
               <h5> On this project...</h5>
               <p> I started this project to try out new things (not actually but new for myself) and enhance my existing skills. </p>
               <p> I've decided to abandon this project.</p>
               <p> Why? </p>
               <p> Because I've realised that I have made a mess. </p>
               <p> There so many things going wrong with this project. </p>
               <p> I have realised I shouldn't be taking on a big project like this one (ecommerce) as a second project. </p>
               <p> But I'm also glad that I have learned quite a few things... </p>
               <p> My code looks so bad. </p>
               <p> I've made git repository (public), you can checkout my code. </p>
               <p> <a href="https://github.com/hrr817/plutus-ecommerce-public"> https://github.com/hrr817/plutus-ecommerce-public </a></p>
               <h4> Next Project is going to be small and thouhtful one.</h4>
          </div>
     )
}

export default React.memo(AboutPage)
