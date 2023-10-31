import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from  './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';

function App (){
    return(
      <BrowserRouter>
      <Navbar>
        <Routes>
            <Route path='/home' exact element={ <Home></Home> }/>
            <Route path='/about' element={ <About></About> }/>
            <Route path='/services' element={<Services></Services>}/>
        </Routes>
      </Navbar>
      </BrowserRouter>
    )
}
export default App;