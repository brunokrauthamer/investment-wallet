// import Provider from "./Context/Provider";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from "./Pages/Login";
import Register from  "./Pages/Register"
import Main from './Pages/Main';
import Taxes from './Pages/Taxes';
import Dividends from './Pages/Dividends';
import Movimentations from './Pages/Movimentarions';


function App() {
  return (
    <BrowserRouter>
      {/* <Provider> */}
        <Routes>
          <Route path="/" element={ <Navigate to="/login"/> } />
          <Route path="/login" element={ < Login /> } />
          <Route path="/register" element={ < Register />} />
          <Route path="/main" element={ < Main /> } />
          <Route path="/taxes" element={ <Taxes /> } />
          <Route path="/dividends" element={ <Dividends /> } />
          <Route path="/movimentation" element={ <Movimentations /> } />
        </Routes>
      {/* </Provider> */}
    </BrowserRouter>
  );
}

export default App;
