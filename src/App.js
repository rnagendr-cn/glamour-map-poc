import React from "react"
import Map from "./components/Map"
import Legend from "./components/Legend"
// import InstagramEmbed from "react-instagram-embed"
import "./App.css"

function App() {
  return (
    <div className="App">
      <div className="titleSection">
        <h2 className="heading">Stories & Resources</h2>
        <Legend />
      </div>
      <Map />
      {/* <InstagramEmbed
        url="https://instagr.am/p/Zw9o4/"
        // clientAccessToken='123|456'
        maxWidth={320}
        hideCaption={false}
        containerTagName="div"
        protocol=""
        injectScript
        onLoading={() => {}}
        onSuccess={() => {}}
        onAfterRender={() => {}}
        onFailure={() => {}}
      /> */}
    </div>
  )
}

export default App
