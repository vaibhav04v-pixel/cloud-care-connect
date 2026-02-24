// React is the main library used to build the user interface
import React from 'react'
// ReactDOM is what allows React to actually display things in a web browser
import ReactDOM from 'react-dom/client'
// App is our main application container where everything starts
import App from './App.jsx'
// This imports the global CSS styles (colors, fonts, layout)
import './index.css'

// 1. Find the element in our HTML file that has the ID 'root'
// 2. Clear it and prepare it to show our React app
// 3. Render (draw) the 'App' component inside that root element
ReactDOM.createRoot(document.getElementById('root')).render(
  // StrictMode is a tool for highlighting potential problems in an application
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
