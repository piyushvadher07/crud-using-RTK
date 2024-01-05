
import './App.css';
import Userdetail from './componenet/Userdetail';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Newuser from './componenet/Newuser';
import Edituser from './componenet/Edituser';

function App() {
  return (
   <>
   <BrowserRouter>
   <Routes>
   <Route path='/' element={<Userdetail />} ></Route>
   <Route path='/newuser' element={<Newuser />} ></Route>
   <Route path='/edituser/:id' element={<Edituser />} ></Route>
   </Routes>
   </BrowserRouter>
    
   </>
  );
}

export default App;
