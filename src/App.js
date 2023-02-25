import {BrowserRouter, Routes, Route} from 'react-router-dom'
import AddCaja from './pages/AddCaja';
import Client from './pages/Client';
import Home from './pages/Home';
function App() {

  
  return (
    <BrowserRouter>
         <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/Caja/add' element={<AddCaja/>}/>
            <Route path='/client/:Nombre' element={<Client/>}/>
         </Routes>
    </BrowserRouter>
  );
}

export default App;
  