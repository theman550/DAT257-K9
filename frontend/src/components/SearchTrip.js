import React from 'react'

const SearchTrip = () => {
  return (
    <form aria-label='Search form'>
      <h2>Search for trips</h2>
      <div>
        <label htmlFor='from'>From: </label>
        <input type='text' id='from' placeholder='Enter start location...'></input>
      </div>
      <div>
        <label htmlFor='to'>To: </label>
        <input type='text' id='to' placeholder='Enter destination'></input>
      </div>
      <div>
        <div>
          <label htmlFor='date'>Date:</label>
          <input type='date' id='date'></input>
        </div>
        <div>
          <label htmlFor='time'>Time:</label>
          <input type='time' id='time'></input>
        </div> 
        <div>
          <label htmlFor='seats'>Seats:</label>
          <input type='number' id='seats'></input>
        </div>
        <div>
          <label htmlFor='price'>Price:</label>
          <input type='number' id='price'></input>
        </div>
      </div>
      <button type='submit'>Search</button>
    </form>
  )
}

export default SearchTrip
