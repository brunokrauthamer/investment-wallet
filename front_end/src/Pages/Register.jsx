import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../style/register.css';
import validateEmail from "../utils/emailValidation";

function Register () {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });

  const [allowBtn, setAllowBtn] = useState(false);
  const [unauthorizedMessage, setUnauthorizedMessage] = useState('');

  useEffect(() => {
    if(credentials.password.length < 6) {
      setUnauthorizedMessage('A senha deve possuir um mínimo de 6 caracteres')
      setAllowBtn(false);
    } else if(credentials && credentials.password !== credentials.passwordConfirmation) {
      setUnauthorizedMessage('A confirmação não corresponde com a senha')
      setAllowBtn(false);
    } else {
      setAllowBtn(true);
    };
  }, [credentials])

  const onTyping = ({ target: { name, value } }) => {
    setCredentials({ ...credentials, [name]: value });
  }

  const registerBtn = () => {
    navigate('/login');
  }

  return (
    <div className="container">
      <form className="container-login">
        <label htmlFor="name" className="container-input-login">
          Nome Completo
          <input
            className="input-login"
            type="text"
            placeholder="Insira seu nome"
            id="name"
            name="name"
            value={ credentials.name }
            onChange = { onTyping }
          />
        </label>
        <label htmlFor="email" className="container-input-login">
          E-mail
          <input
            className="input-login"
            type="email"
            placeholder="Insira seu e-mail"
            id="email"
            name="email"
            value = { credentials.email }
            onChange = { onTyping }
          />
        </label>
        <label htmlFor="password" className="container-input-login">
          Senha
          <input
            className="input-login"
            type="password"
            placeholder="Insira sua senha"
            id="password"
            name="password"
            value = { credentials.password }
            onChange = { onTyping }
          />
        </label>
        <label htmlFor="password-confirmation" className="container-input-login">
          Confirmação de senha
          <input
            className="input-login"
            type="password"
            placeholder="Confirme sua senha"
            id="password-confirmation"
            name="passwordConfirmation"
            value = { credentials.passwordConfirmation }
            onChange = { onTyping }
          />
        </label>
        <button
          type="button"
          className="register-btn"
          onClick={ registerBtn }
          disabled={ !allowBtn }
        >
          Criar novo usuário
        </button>
      </form>
      { unauthorizedMessage && <div className="unauthorized">{ unauthorizedMessage }</div> }
    </div>
  )
};

export default Register;