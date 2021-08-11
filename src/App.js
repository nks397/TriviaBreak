import React from "react"
import Home from "./Home"
import Film from "./categories/Film"
import Music from "./categories/Music"
import Sports from "./categories/Sports"
import Categories from "./categories/Categories"
import About from "./About"
import { Link, Switch, Route } from "react-router-dom"

function App() {  
    return (
        <div>
            <nav>
                <h3 className="home">
                    <Link to="/">Home</Link>
                </h3>
                <h3 className="categories">
                    <Link to="/categories">Categories</Link>
                </h3>
                <h3 className="about">
                    <Link to="/about">About</Link>
                </h3>
            </nav>
            <main>
                <Switch>
                    <Route exact path="/"><Home /></Route>
                    <Route exact path="/categories"><Categories /></Route>
                    <Route path="/about"><About /></Route>
                    <Route path="/film"><Film /></Route>
                    <Route path="/music"><Music /></Route>
                    <Route path="/sports"><Sports /></Route>
                </Switch>
            </main>    
            <footer>
                <h2 className="facebook"><i class="fab fa-facebook-square"></i></h2> 
                <h2 className="twitter"><i class="fab fa-twitter-square"></i></h2>
                <h2 className="instagram"><i class="fab fa-instagram-square"></i></h2>
                <h2 className="tumblr"><i class="fab fa-tumblr-square"></i></h2>
                <h2 className="reddit"><i class="fab fa-reddit-square"></i></h2>
            </footer>
        </div>
    )
}

export default App