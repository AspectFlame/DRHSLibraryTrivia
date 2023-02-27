import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from './mainpage';
import NewPage from './newpage';
import Login from './login';

function App() {
  return (
    <div>
        <Routes>
          <Route exact path='/' element={<MainPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/newpage' element={<NewPage />} />
        </Routes>
    </div>
  )
  
}

export default App;