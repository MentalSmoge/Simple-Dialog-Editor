/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
import { observer } from 'mobx-react-lite';
import Modal from 'react-modal';
import '../Modal.css';
// import { useState } from 'react';
import { useState } from 'react';
import AuthModalStore from './AuthModalStore';
import ErrorMessage from '../../components/Error/ErrorMessage';
import RegisterModalStore from '../Modal_Register/RegisterModalStore';


const AuthModal = observer(() => {

  const [showPassword, setShowPassword] = useState(false);

  const closeModal = () => {
    AuthModalStore.closeModal();
    AuthModalStore.clearFields();
    setShowPassword(false);
  }

  const handleLogin = () => {
    AuthModalStore.login();
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowRegister = () => {
    setShowPassword(false);
    AuthModalStore.closeModal();
    RegisterModalStore.openModal();
  };

  return (
    <Modal
      isOpen={AuthModalStore.isOpen}
      onRequestClose={closeModal}
      contentLabel="Login Modal"
      ariaHideApp={false}
      className="modal auth-modal"
    >
      <h2 className='header modal_login_text'>Authorization</h2>
      <p className='p'>E-mail</p>
      <input
        // autoFocus
        className="input"
        value={AuthModalStore.email}
        onChange={e => AuthModalStore.setEmail(e.target.value)}
      />
      <p className='p'>Password</p>
      <input
        type={showPassword ? 'text' : 'password'}
        className="input"
        value={AuthModalStore.password}
        onChange={e => AuthModalStore.setPassword(e.target.value)}
      />
      <label className="checkbox-label">
          <input
            type="checkbox"
            checked={showPassword}
            onChange={togglePasswordVisibility}
            className="show-password-checkbox"
          />
          <span className="show-password-text">Show password</span>
      </label>
      <ErrorMessage />
      <div className='button-row'>
        <button onClick={handleLogin} type="button" className='add'>Login</button>
        <button onClick={closeModal} type="button" className='close'>Cancel</button>
      </div>
      <button onClick={toggleShowRegister} className='button_neutral yet_account'>Don't have an account yet? Register</button>
    </Modal>
  );
});

export default AuthModal;
