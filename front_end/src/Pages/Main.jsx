import { useEffect, useState } from 'react';
import '../style/main.css'
import profitabilityFunc from '../utils/profitabilitySimulator'
import parseDateString from '../utils/parseDateString';
import { Chart } from 'react-google-charts';
import Navbar from '../Components/Navbar';
import Header from '../Components/Header';

function Main() {

  const [clickedButton, setClickedButton] = useState('all');
  const [profitabilityData, setProfitabilityData] = useState([]);
  const [profitabilityDisplay, setProfitabilityDisplay] = useState([]);

  // const profitability = profitabilityFunc();

  const mockAPIResponse = {
    netWorth: 1000000,
    assetAllocation: [
      ['Classe de ativo', 'classe'],
      ['Ações BR', 150000],
      ['Ações EUA', 150000],
      ['FIIs', 200000],
      ['Caixa', 200000],
      ['IPCA', 300000]
    ]
  }

  useEffect(() => {
    const profitability = profitabilityFunc();
    // console.log(profitability);
    // const profitabilityToDisplay = profitability.map((data) => [data[0], data[1]]);
    // console.log(profitabilityToDisplay)
    setProfitabilityData(profitability);
    setProfitabilityDisplay(profitability);
  }, []);

  const buttonClassName = (buttonName) => {
    if (buttonName === clickedButton) {
      return 'clicked-filter-button';
    } return 'filter-button'
  };

  const handleFilterClick = ({ target }) => {
    // console.log(target.name);
    setClickedButton(target.name);
    const nameToDate = {
      oneYear: 365,
      threeYears: 1095,
    };

    if (target.name === 'all') {
      setProfitabilityDisplay(profitabilityData);
      return;
    }
    const startingDate = new Date();
    startingDate.setDate(startingDate.getDate() - nameToDate[target.name]);
    // console.log('starting date', startingDate);
    // console.log('profitability Data', profitabilityData);
    const profitabilityToDisplay = profitabilityData.filter((data) => data[0] === "Data" || parseDateString(data[0]) > startingDate)
    // console.log('profitability to display', profitabilityToDisplay);
    setProfitabilityDisplay(profitabilityToDisplay);
  };

  return (
    <div className="container">
      <Header />
      <div className='content'>
        <Navbar  />
        <main className="main-content">
          <div className='initial-cards'>
            <div className='net-worth'>
              <h2>Patrimônio Líquido</h2>
              <h1 className='net-worth-value'> { mockAPIResponse.netWorth.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) } </h1>
            </div>
            <div className='asset-allocation'>
              <h2>Distribuição de Carteira</h2>
              {/* { console.log(profitabilityDisplay)} */}
              <Chart
                chartType='PieChart'
                width={'100%'}
                height={'90%'}
                data={mockAPIResponse.assetAllocation}
                col
                options={ {
                  // title: 'Distribuição de Carteira',
                  pieHole: 0,
                  is3D: false,
                  backgroundColor: '#282A3A',
                  colors: ['#54C3CF', '#F3B35A', '#FCD204', '#DFE06C', '#B0B0B0', '#929292', '#5D5D5D'],
                  legend: { textStyle: { color: 'white', fontSize: 16 } },
                  pieSliceTextStyle: {
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#000080'
                  },
                } }
              />
            </div>
          </div>
          <div className='profitability-chart'>
            <div className='data-filter'>
                <button
                  name='oneYear'
                  onClick={ handleFilterClick }
                  className={ buttonClassName('oneYear') }
                >
                  1 Ano
                </button>
                <button
                  name='threeYears'
                  onClick={ handleFilterClick }
                  className={ buttonClassName('threeYears') }
                >
                  3 Anos
                </button>
                <button
                  name='all'
                  onClick={ handleFilterClick }
                  className={ buttonClassName('all') }
                >
                  Tudo
                </button>
            </div>
            <br />
            <Chart
              chartType='LineChart'
              width='100%'
              height='100%'
              data={ profitabilityDisplay }
              loader={ 'Carregando' }
              options={ {
                vAxis: { format: 'percent', gridlines: { color: 'none' }, textStyle: { color: 'white' } },
                hAxis: { textStyle: { color: 'white' } },
                title: 'Rentabilidade da Carteira',
                titleTextStyle: { color: 'white', fontSize: 24 },
                curveType: 'function',
                legend: { position: 'bottom', textStyle: { color: 'white' } },
                backgroundColor: '#282A3A',
                tooltip: {
                  // trigger: 'selection',
                  isHtml: true,
                  textStyle: {
                    fontSize: 14,
                    bold: true
                  },
                },
                series: [{ color: '#1d9dff' }],
              } }
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Main;