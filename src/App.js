import React from 'react';
import {Cards, Chart, CountryPicker} from './components/index'
import styles from './App.module.css';
import {fetchData} from './api/index';
import covidimg from './img/covid.png'

class App extends React.Component{

    state = {
        data : {},
        country: ''
    };

    async componentDidMount() {
        const fetchedData = await fetchData();
        this.setState({data : fetchedData});
    }

    handleCountryChange = async (country) => {
        const fetchedData = await fetchData(country);
        this.setState({data : fetchedData, country: country});
    }

    render() {
        const {data , country} = this.state;
        return (
            <div className={styles.container}>
                <img src={covidimg} className={styles.covidimg} align="Covid-19"/>
                <Cards data={data}/>
                <CountryPicker handleCountryChange = {this.handleCountryChange} />
                <Chart data = {data} country = {country} />
            </div>
        )
    }
}

export default App;