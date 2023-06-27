import { useEffect, useState } from "react";
import Header from "../Components/Header";
import Navbar from "../Components/Navbar";
import '../style/movimentation.css'

function Movimentations() {
  const [formFields, setFormFields] = useState({
    name: '',
    ticker: '',
    type: '',
    date: '',
    quantity: 0,
    price: 0,
    buy: false,
    sell: false
  });

  const [disabledButton, setDisabledButton] = useState(true);

  const handleTyping = ({ target }) => {
    setFormFields({ ...formFields, [target.name]: target.value });
  }

  useEffect(() => {
    const { name, ticker, type, date, quantity, price, buy, sell } = formFields;
    (name && type && date && quantity && price && (buy || sell) && /^[A-Z]{4}\d{1,2}$/.test(ticker)) ?
    setDisabledButton(false) : setDisabledButton(true)
  }, [formFields])

  const handleRadio = ({ target }) => {
    if (!formFields.buy && !formFields.sell) {
      setFormFields({ ...formFields, [target.name]: !formFields[target.name] });
    } else {
      setFormFields({ ...formFields, buy: !formFields.buy, sell: !formFields.sell })
    }
  }

  const sendMovimentation = () => {
    console.log(formFields);
    // Enviar para o backend as informações de movimentação
  }

  return (
    <div className="container">
      <Header />
      <div className="content">
        <Navbar />
        <div className="main-content-movimentation">
          <h2>Insira uma nova movimentação</h2>
          <form className="movimentation-form">
            <label htmlFor="asset-name" className="">
              Nome do ativo
              <input
                type="text"
                className=""
                placeholder="Insira o nome do ativo"
                id="asset-name"
                name="name"
                value={ formFields.name }
                onChange={ handleTyping }
              />
            </label>
            <label htmlFor="asset-ticker" className="">
              Ticker do Ativo
              <input
                type="text"
                className=""
                placeholder="Insira o nome do ativo"
                id="asset-ticker"
                name="ticker"
                value={ formFields.ticker }
                onChange={ handleTyping }
              />
            </label>
            <label htmlFor="asset-type-selector" className="">
              Tipo de ativo
              <select
                type="select"
                className=""
                id="asset-type-selector"
                name="type"
                value={ formFields.type }
                onChange={ handleTyping }
              >
                <option value="">Selecione o tipo de ativo</option>
                <option value="br_stock">Ações Brasil</option>
                <option value="us_stock">Ações EUA</option>
                <option value="fii">Fundos Imobiliários</option>
                <option value="net">Caixa</option>
                <option value="ipca">Renda Fixa IPCA</option>
                <option value="pre">Renda Fixa Pré-Fixado</option>
                <option value="post">Renda Fica Pós-Fixado</option>
              </select>
            </label>
            <label htmlFor="">
              Data
              <input
                type="date"
                name="date"
                id="date"
                value={ formFields.date }
                onChange = { handleTyping }
              />
            </label>
            <label htmlFor="qtt-negotiated" className="">
              Quantidade negociada
              <input
                type="number"
                className="qtt-negotiated"
                placeholder="Insira a quantidade negociada"
                id="qtt-negotiated"
                name="quantity"
                value={ formFields.quantity }
                onChange={ handleTyping }
              />
            </label>
            <label htmlFor="avg-price" className="">
              Preço médio negociado
              <input
                type="number"
                className=""
                placeholder="Insira o preço médio"
                id="avg-price"
                name="price"
                value={ formFields.price }
                onChange={ handleTyping }
              />
            </label>
            <div className="negotiation-type">  
              <label htmlFor="buy-negotiation-type">
                Compra
                <input
                  type="radio"
                  id="buy-negotiation-type"
                  name="buy"
                  value="Compra"
                  checked={ formFields.buy }
                  onChange={ handleRadio }
                />
              </label>
              <label htmlFor="sell-negotiation-type">
                Venda
                <input
                  type="radio"
                  id="sell-negotiation-type"
                  name="sell"
                  value="Venda"
                  checked={ formFields.sell }
                  onChange={ handleRadio }
                />
              </label>
            </div>
            <button
              type="button"
              onClick={ sendMovimentation }
              className="insert-movimentarion-button"
              disabled={ disabledButton }
            >
              Inserir movimentação
            </button>
          </form>
        </div>
      </div>
    </div>
  )
};

export default Movimentations;