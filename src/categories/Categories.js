import React from "react"
import {Link} from "react-router-dom"

function Categories() {
    return(
        <div className="category-container">
            <h3 className="category-title">Choose your category</h3>
            <div className="category-list">
                <h3 className="film">
                    <Link to="/film"><i className="fas fa-film"></i> Film</Link>
                </h3>
                <h3 className="music">
                    <Link to="/music"><i className="fas fa-music"></i> Music</Link>
                </h3>
                <h3 className="sports">
                    <Link to="/sports"><i className="fas fa-football-ball"></i> Sports</Link>
                </h3>
            </div>
        </div>
    )
}

export default Categories