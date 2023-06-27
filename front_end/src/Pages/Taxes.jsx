import { useEffect, useState } from 'react';
import Header from '../Components/Header';
import Navbar from '../Components/Navbar';
import '../style/taxes.css'
import mockTaxesData from '../utils/mockTaxesData';

function Taxes() {
  const [checkboxController, setCheckboxController] = useState({ pending: true, payed: true });
  const [taxesData, setTaxesData] = useState([]);
  const [displayTaxesData, setDisplayTaxesData] = useState([]);

  useEffect(()=> {
    setTaxesData(mockTaxesData);
    setDisplayTaxesData(mockTaxesData);
  }, []);

  useEffect(() => {
    const translate = {
      'Pendente': 'pending',
      'Pago': 'payed',
    };
    const display = taxesData.filter((data) => checkboxController[translate[data.status]]);
    setDisplayTaxesData(display);
  }, [checkboxController, taxesData]);

  const handleFilter = ({ target }) => {
    setCheckboxController((prev) => ({...prev, [target.name]: !prev[target.name]}));
  }
  return (
    <div className="container">
      <Header />
      <div className='content'>
        <Navbar />
        <div className='main-content'>
          <form>
            <h2>Filtros:</h2>
            <label htmlFor="pending">
              Pendentes
              <input
                type="checkbox"
                checked={checkboxController.pending}
                onChange = { handleFilter }
                name='pending'
                id='pending'
              />
            </label>
            <label htmlFor="payed">
              Pagos
              {console.log('pagos', checkboxController.payed)}
              <input
                type="checkbox"
                checked={checkboxController.payed}
                onChange = { handleFilter }
                name='payed'
                id='payed'
              />
            </label>
          </form>
          <div className='taxes-list'>
            <table>
              <tr>
                <th>Data de Referência</th>
                <th>Data de Vencimento</th>
                <th>Valor</th>
                <th>Status</th>
                <th>Editar Status</th>
              </tr>
              { displayTaxesData.map((data) => (
                <tr>
                  <td>{data.referenceDate}</td>
                  <td>{data.payday}</td>
                  <td>{data.value}</td>
                  <td>{data.status}</td>
                  <td>
                    <button
                      // onClick={ put para o backend alterando o status }
                      name={ data.status === 'Pendente' ? 'payed' : 'pending'}
                    >
                      { data.status === 'Pendente' ? 'Pago' : 'Pendente'}
                    </button>
                  </td>
                </tr>
              )) }
            </table>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Taxes;