import axios from 'axios';

const BASE_URL = 'https://disease.sh/v3/covid-19';

export const fetchData = async (country) => {
    try {
        const endpoint = country ? `${BASE_URL}/countries/${country}` : `${BASE_URL}/all`;
        const { data } = await axios.get(endpoint);

        return {
            confirmed: { value: data.cases },
            recovered: { value: data.recovered },
            deaths: { value: data.deaths },
            lastUpdate: new Date(data.updated).toISOString(),
        };
    } catch (e) {
        console.error('Failed to fetch COVID data:', e);
    }
};

export const fetchdailyData = async () => {
    try {
        const { data } = await axios.get(`${BASE_URL}/historical/all?lastdays=30`);
        return Object.keys(data.cases).map((date) => ({
            confirmed: data.cases[date],
            deaths: data.deaths[date],
            date,
        }));
    } catch (e) {
        console.error('Failed to fetch daily COVID data:', e);
    }
};

export const fetchCountries = async () => {
    try {
        const { data } = await axios.get(`${BASE_URL}/countries`);
        return data.map(({ country }) => country).sort();
    } catch (e) {
        console.error('Failed to fetch countries:', e);
    }
};