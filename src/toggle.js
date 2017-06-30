import React from 'react'

export default function Toggle(props) {
  return (
    <button onClick={props.onClick}>
      {props.isAscending ?
        "Ascending" :
        "Descending"
      }
    </button>
  )
}
