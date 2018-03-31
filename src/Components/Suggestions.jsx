import React from 'react'
import './Searchbar.css'

const Suggestions = (props) => {
  const options = props.results.map(r => (
    <li>
      {r.name}
    </li>
  ))
  return <div className="suggestion-box"><ul>{options}</ul></div>
}

export default Suggestions
