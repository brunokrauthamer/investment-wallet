import { Link } from 'react-router-dom';
import '../style/navbar.css'

function Navbar() {
 return (
  <nav className='nav-bar'>
    <Link to='/main' className='link'>Início</Link>
    <Link to='/movimentation' className='link'>Inserir Movimentações</Link>  
    <Link to='/assets' className='link'>Ativos</Link>  
    <Link to='/wallets' className='link'>Carteiras</Link>  
    <Link to='/dividends' className='link'>Dividendos</Link>  
    <Link to='/taxes' className='link'>IR - DARF</Link>  
    <Link to='/history' className='link'>Histórico</Link>
  </nav>
 );
}

export default Navbar;