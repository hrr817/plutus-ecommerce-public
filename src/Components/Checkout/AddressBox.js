import React, {memo, useEffect, useState, useCallback} from 'react'
import { useForm } from 'react-hook-form'
import './style.scss'

// Resable Component
import { ModelBox } from '../Reusable/ModelBox'
import Input from '../Reusable/Input'
import Select from '../Reusable/Select'
import Loading from '../Reusable/Loading'

import { commerce } from '../../lib/commerce'
import { Link } from 'react-router-dom';

const AddressBox = props => {

     const { theme, token, loading, shippingData, proceedToPayments } = props

     const [shippingCountries, setShippingCountries] = useState([])
     const [selectedCountry, setSelectedCountry] = useState('')
     const [shippingSubdivisions, setShippingSubdivisions] = useState()
     const [selectedSubdivision, setSelectedSubdivision] = useState()
     const [shippingOptions, setShippingOptions] = useState()

     const { register, handleSubmit } = useForm({
          defaultValues: {
               ...shippingData
          }
     })

     // Fetch Countries
     useEffect(() => {
          token && (async() => {
               try {
                    let res = await commerce.services.localeListShippingCountries(token.id)
                    setShippingCountries(res.countries)
               } catch(e) {
                    // console.log(e)
               }
          })();
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [token])

     // Fetch subdivisions according to selected country
     useEffect(() => {
          selectedCountry && (async() => {
               try {
                    let res = await commerce.services.localeListShippingSubdivisions(token.id, selectedCountry)
                    setShippingSubdivisions(res.subdivisions)
               } catch(e) {
                    // console.log(e)
               }
          })();
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [selectedCountry]);

     // Fetch shipping options
     useEffect(() => {
          selectedSubdivision && (async() => {
               try {
                    let res = await commerce.checkout.getShippingOptions(token.id, {country: selectedCountry, region: selectedSubdivision})
                    setShippingOptions(res)
               } catch(e) {
                    // console.log(e)
               }
          })();
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [selectedSubdivision])

     // Memoized setters
     const memoSetCountry = useCallback(val => { setSelectedCountry(val) }, [],)
     const memoSetRegion = useCallback(val => { setSelectedSubdivision(val) }, [],)

     return (
          <>
               <ModelBox.Section className="tab-section"> 
                    <div className="active-tab">
                         <span className="active-num"> 1 </span> 
                         Shipping address 
                    </div>
                    <div>
                         <span> 2 </span> 
                         Payment details  
                    </div>
               </ModelBox.Section>
               {loading? 
               <ModelBox.Section>
                    <Loading theme={theme} value="Processing"/>
               </ModelBox.Section> :
               <ModelBox.Form className="form" onSubmit={() => handleSubmit(data => {
                    proceedToPayments({...data, shippingCountry: selectedCountry, shippingSubdivision: selectedSubdivision})
               })}>
                    <Input label="First Name" name="firstName" register={register} required/>
                    <Input label="Last Name" name="lastName" register={register} required/>
                    <Input label="Address" name="address1" register={register} required/>
                    <Input label="Email" name="email" type="email" register={register} required/>
                    <Input label="City" name="city" register={register} required/>
                    <Input label="Zip / Postal Code" name="zip" register={register} required/>

                    <Select label="Country" name="country" 
                    options={shippingCountries && shippingCountries} 
                    onChange={memoSetCountry}
                    register={register}
                    required/>

                    <Select label="Region" name="region" 
                    options={shippingSubdivisions && shippingSubdivisions} 
                    onChange={memoSetRegion} 
                    register={register}
                    required/>

                    <Select label="Shipping Options" name="shippingOption" 
                    options={shippingOptions && shippingOptions} 
                    register={register}
                    required/>

                    <div className="span-column">
                         <Link to="/cart"> <button className="button-full back"> Cart </button> </Link>
                         <button className="button-full next"> Next </button> 
                    </div>
               </ModelBox.Form>}
          </>
     )
}

export default memo(AddressBox)
