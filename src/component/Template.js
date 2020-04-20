import React from 'react';
import '../css/Template.css';
import logo from '../img/shutterstock_1434162902-cutout-cutout.png';
import { NavLink, Route, Switch } from 'react-router-dom';
import Weather from './Weather';
import MainVisual from './MainVisual';
import List from './List';
import styled from 'styled-components';

const Footer =  styled.div`
    width: 100%;
    height:50px;
    background-color: #000;
    display:table;
    div{
        display: table-cell;
        vertical-align: middle;
        text-align: center;
    }
    p {
        color:#fff;
    }
`; 

const Template = ({data}) => {
    const category = Object.keys(data.category);

    return (
        <>
            <header>
                <div className="header_inner">
                    <div className="box">
                        <div className="logo">
                        <NavLink to="/">
                            <img src={logo} alt="" />
                        </NavLink>
                        </div>
                        <nav className="menu">
                            <ul>
                                {category.map((data, idx) => (
                                    <li key={idx}>
                                        <NavLink
                                            to={data}>
                                                {data}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>
            <MainVisual/>
            <Switch>
                <Route path="/wheather" component={(props) => <Weather {...props} data={data}/> }/>
                <Route path="/:category" render={(props) => <List {...props} data={data} />}/>
                <Route path="/" exact></Route>
            </Switch>
            <Footer>
                <div>
                    <p>JEJU BLOG</p>
                </div>
            </Footer>
        </>
    );
};

export default Template;