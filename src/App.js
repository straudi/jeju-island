import React from 'react';
import data from "./info.json";
import './App.css';
import Template from './component/Template';

function App() {
  return (
        <Template data={data}/>
    
  );
}

export default App;
