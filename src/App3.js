import { useReducer } from 'react'
import About from './about'
import Home from './home'
import Nav from './nav'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'


function App3(){
    return (
        <Router>
            <div className="App3">
            <Switch>
               <Route path="/" component={Home}/>
                <Route path="/about" component={About}/>
                <Route path="/nav" exact component={Nav}/>
                <Route path="/nav/:id" component={item}/>
            </Switch>
            </div>
        </Router>
    )
}

export default App3