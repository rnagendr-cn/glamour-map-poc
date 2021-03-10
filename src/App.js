import React from "react"
import Map from "./components/Map"
import Legend from "./components/Legend"
import "./App.css"

function App() {
  return (
    <div className="App">
      <div className="titleSection">
        <h2 className="heading">Stories & Resources</h2>
        <Legend />
      </div>
      <Map />
    </div>
  )
}

export default App
