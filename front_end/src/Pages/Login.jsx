import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style/login.css'
import validateEmail from '../utils/emailValidation';

function Login() {
  const navigate = useNavigate();

  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  const [unauthorizedCredentialsMessage, setUnauthorizedCredentialsMessage] = useState(true);
  const [allowBtn, setAllowBtn] = useState(false);
  const [invalidEmailFormat, setInvalidEmailFormat] = useState('');

  useEffect(() => {
    if (validateEmail(login.email)) {
      setInvalidEmailFormat('');
      setAllowBtn(true);
    } else {
      setInvalidEmailFormat('O e-mail deve ter um formato adequado')
      setAllowBtn(false);
    }
  }, [login])

  const onTyping = ({ target: { name, value } }) => {
    setLogin({...login, [name]: value });
  }

  const loginBtn = () => {
    // request para o backend verificando as credenciais
    // se forem boas, direcionar para a página principal
    navigate('/main');
    // se forem ruins, alterar o invalidMessage para true
  }
  return (
    <div className="container">
      <form className="container-login">
        <label htmlFor="email" className="container-input-login">
          Login
          <input
            className="input-login"
            type="text"
            placeholder="Insira seu e-mail"
            id="email"
            name="email"
            value={ login.email }
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
            value={ login.password }
            onChange = { onTyping }
          />
        </label>
        <button
          type="button"
          onClick={ loginBtn }
          className="login-btn"
          disabled={ !allowBtn }
        >
          Login
        </button>
        <Link className="register-link" to="/register">Ainda não tenho conta</Link>
        { invalidEmailFormat && <div className='error-message'>{ invalidEmailFormat }</div> }
        { unauthorizedCredentialsMessage && <div className='error-message'> { unauthorizedCredentialsMessage }</div> }
      </form>
      <p
        hidden={ !unauthorizedCredentialsMessage }
      >
        Usuário ou senha invalido(s)
      </p>
    </div>
  );
}

export default Login;