import React, {useState, useEffect} from "react";
import {fetchCountries} from '../../api/index';
import {NativeSelect, FormControl} from '@material-ui/core';
import styles from './CountryPicker.module.css';

const CountryPicker = ({handleCountryChange}) => {
    const [countries , setCountries] = useState([]);

    useEffect(()=>{
       const countriesFetch = async ()=> {
            setCountries(await fetchCountries())
        }
        countriesFetch();
    },[setCountries]);


    return (
        <FormControl className={styles.formControl}>

            <NativeSelect onChange={(e) => handleCountryChange(e.target.value)}>
                <option value=''>Global</option>
                {countries.map((country,i) => <option key={i} value={country}>{country}</option>)}
            </NativeSelect>

        </FormControl>
    )
}

export default CountryPicker;