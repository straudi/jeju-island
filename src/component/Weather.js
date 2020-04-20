import React, { useReducer, useEffect, useState  } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { WiCloudy, WiDaySunny } from "react-icons/wi";

const WeatherBox = styled.div`
    display: flex;
    padding-top:2%;
    background: ${props => props.color};
    padding: 2% 0%;

    .regionSel {
        flex-grow: 1;
    }

    select {
        width: 30%;
        font-size: 1.2rem;
        text-align-last: center;
        margin-left:35%;
    }
    .forecastList {
        flex-grow: 1;
    }

    li{
        font-size: 1.2rem;
        padding-bottom: 2%; 
    }
`;

function reducer(state, action) {
    switch(action.type) {
        case 'LOADING' : 
            return {
                loading: true,
                data : null,
                error: null
            }
        case 'SUCCESS' :
            return {
                loading : false,
                data : action.data,
                error: null
            }
        case 'ERROR' :
            return {
                loading:false,
                data: null,
                error:action.error
            }
        default : 
            throw new Error(`unhandled action type: ${action.type}`);
    }
};

function Weather({data}) {

    const [state,dispatch] = useReducer(reducer, {
            loading: false,
            data : null,
            error: null
    });

    const [region , setRegion] = useState(0);
    const latNum = data.category.wheather[region].lat;
    const lotNum = data.category.wheather[region].lot;
    
    const onChange = (e) => {
        e.preventDefault();
        setRegion(e.target.value);
        fetchData();
    }
        
    const fetchData = async () => {
        dispatch({ type: 'LOADING' });
        try {
            const response = await axios.get('http://api.openweathermap.org/data/2.5/weather', {
                params: {
                    lat: latNum,
                    lon: lotNum,
                    APPID: 'bf5c2adc189a58dd5293c62c048b0c20'
                },
            });
            dispatch({ type:'SUCCESS', data: response.data });
        }catch(e){
            dispatch({type:'ERROR' , error: e})
        }
    };

    useEffect(() => {
        fetchData();
    },[]);

    const {loading, data:forecast , error} = state;
    if(loading) return <div>로딩중</div>;
    if(!forecast) return <div>날씨 정보를 불러올 수 없습니다.</div>

    return(
        <WeatherBox color="#e9e1cc">
            <div className="regionSel">
                <select name="region" value={region} onChange={onChange}>
                    {data.category.wheather.map((value,index) => (
                        <option value={index} key={index}>{value.city}</option>
                    ))}
                </select>
            </div>
            {forecast.weather[0].main === "Clouds" && <div><WiCloudy size="24"/></div>}
            {forecast.weather[0].main === "Clear" && <div><WiDaySunny size="24"/></div>}
            <ul className="forecastList">
                <li>현재 날씨 : {forecast.weather[0].main}</li>
                <li>현재 온도 : {Math.ceil(forecast.main.temp - 273.15)}</li>
                <li>체감 온도 : {Math.ceil(forecast.main.feels_like - 273.15)}</li>
                <li>습도 : {forecast.main.humidity}</li>
                <li>풍속 : {forecast.wind.speed}</li>
            </ul>
        </WeatherBox>
    )
}

export default Weather;