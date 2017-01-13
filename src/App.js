import React, {Component} from 'react'
import './App.css'
import WikipediaSearch from './WikipediaSearch'
import Hero from './Hero'

class App extends Component {
    render() {
        return (
            <div className="App">
                <Hero/>
                <WikipediaSearch/>
            </div>
        );
    }
}

export default App;
