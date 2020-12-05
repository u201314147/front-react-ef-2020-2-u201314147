import { Link } from 'react-router-dom'
import React from 'react'

const HomePage = () => (
  <div className="jumbotron">
    <h1>UPC Academic App</h1>
    <p>React with Redux and Typescript.</p>
    <Link to="about" className="btn btn-primary btn-lg">
      Learn more
    </Link>
  </div>
)

export default HomePage
