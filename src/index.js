import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { BrowserRouter as Router } from "react-router-dom"
import { TriviaProvider } from "./context"
import "./styles.css"

ReactDOM.render(
  <TriviaProvider>
    <Router>
      <App />
    </Router>
  </TriviaProvider>,
  document.getElementById("root")
)
