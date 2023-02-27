import React from 'react';
import axios from 'axios';

function App() {
  const [events, setEvents] = React.useState([]);

  const uploadFile = (e) => {
    e.preventDefault();
    let file = document.querySelector('#myfile').files[0];
    const formData = new FormData();
  
    formData.append("file", file);
  
    axios
      .post("http://localhost:5001/api/upload", formData)
      .then(res => {
        console.log(res);
        setEvents(res.data);
      })
      .catch(err => console.warn(err));
  }
  if(events.length===0) {
    axios
      .post("http://localhost:5001/api/onLoad")
      .then(res => {
        //console.log(res);
        setEvents(res.data);
      })
      .catch(err => console.warn(err)); 
      
  }
  if(events.length!==0) {
    return (
      <div className="App">
        <input type="file" id="myfile" name="myfile" accept=".xlsx" />
        <button onClick={uploadFile}>Run Excel Parse</button>
        <p>{JSON.stringify(events)}</p>
        <table className="table-auto">
          <thead>
            <tr>
              <th>
                {events[0].kahoot}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Name</td>
              <td>Val</td>
            </tr>
            <tr>
              <td>Name</td>
              <td>Val</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  else{
    return <div></div>
  }
  
}

export default App;