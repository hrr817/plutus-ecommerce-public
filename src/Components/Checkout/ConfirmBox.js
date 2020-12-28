import React from 'react'
import { Link } from 'react-router-dom'
import { ModelBox } from '../Reusable/ModelBox'

import {ReactComponent as ConfirmSVG} from '../../assets/svg/confirm.svg' 

const ConfirmPage = () => {
     return (
          <>
               <h3 style={{textAlign: 'center'}}> Order has been placed successfully. </h3>
               <ModelBox.Section className="confirm-container">
                    <ConfirmSVG/>
                    <p style={{textAlign: 'center', wordWrap: 'break-word'}}>
                         Order will be confirmed within 24 hours.
                    </p>
                    <Link to="/"> Go back </Link>
               </ModelBox.Section>
          </>
     )
}

export default React.memo(ConfirmPage)
