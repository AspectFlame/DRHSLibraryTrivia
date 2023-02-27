import React from 'react';
import axios from 'axios';

const Contest = (data) => {
    return (
      <div>
        <p>{data.name}</p>
        <p>{data.score}</p>
      </div>
    );
  }
function MainPage() {
    const [events, setEvents] = React.useState([]);
    if (Object.keys(events).length === 0) {
    axios
        .post("http://localhost:5001/api/leaderboard")
        .then(res => {
        //console.log(res);
        setEvents(res.data);
        console.log(events);
        })
        .catch(err => console.warn(err)); 
        
    }
    
    return (
        <div className="App">
        <nav>
            <a href='/login'>Login</a>
            <a href='/newpage'>New Page</a>
        </nav>
        <p>{JSON.stringify(events)}</p>
        {Object.entries(events).map(([name, score]) => <Contest name={name} score={score} /> )}
        </div>
    );
}

export default MainPage;