import { useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import AddCaja from './pages/AddCaja';
import Client from './pages/Client';
import Home from './pages/Home';
function App() {
  const [Search, setSearch] = useState('')
  
  return (
    <BrowserRouter>
         <Routes>
            <Route path='/' element={<Home Search={Search} setSearch={setSearch}/>}/>
            <Route path='/Caja/add' element={<AddCaja/>}/>
            <Route path='/client/:Nombre/:id' element={<Client Search={Search}/>}/>
         </Routes>
    </BrowserRouter>
  );
}

export default App;
  