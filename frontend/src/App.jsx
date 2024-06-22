import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import CreateBooks from './pages/CreateBooks'
import ShowBook from './pages/ShowBook'
import EditBook from './pages/EditBook'
import DeleteBook from './pages/DeleteBook'

function App() {
  return (
    <Routes>
<Route path='' element={<Home/>}/>
<Route path='' element={<CreateBooks/>}/>
<Route path='' element={<ShowBook/>}/>
<Route path='' element={<EditBook/>}/>
 <Route path='' element={<DeleteBook/>}/>     
      </Routes>
  )
}

export default App
