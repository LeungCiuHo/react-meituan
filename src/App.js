import React from 'react';
import {Route,Switch} from 'react-router-dom'
import TabbarController from './controllers/TabbarController'
import DetailView from './view/DetailView/DetailView'
import './App.css';

function App() {
    return (
        <div className="App">
            <Switch>
                <Route path="/detail/:id" component={DetailView}/>
                <Route path="/" component={TabbarController}/>
            </Switch>
        </div>
    );
}

export default App;
