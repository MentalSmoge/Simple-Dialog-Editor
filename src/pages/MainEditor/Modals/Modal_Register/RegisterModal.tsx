/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import Modal from 'react-modal';
import RegisterModalStore from './RegisterModalStore';
import '../Modal.css';
import ErrorMessage from '../../components/Error/ErrorMessage';

const RegisterModal = observer(() => {

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    setShowConfirmPassword(!showConfirmPassword);
  };

  const closeModal = () => {
    RegisterModalStore.closeModal();
  }

  const handleRegister = () => {
    RegisterModalStore.register();
    setShowPassword(false);
    setShowConfirmPassword(false);
  }

  // if (!RegisterModalStore.isOpen) return null;

  return (
    <Modal
      isOpen={RegisterModalStore.isOpen}
      onRequestClose={closeModal}
      contentLabel="Register Modal"
      ariaHideApp={false}
      className="modal register-modal"
    >
      <h2 className='header'>Registration</h2>
      <p className='p'>Username</p>
      <input
          className="input"
          value={RegisterModalStore.username}
          onChange={e => RegisterModalStore.setUsername(e.target.value)}
      />
      <p className='p'>E-mail</p>
      <input
        // autoFocus
          className="input"
          value={RegisterModalStore.email}
          onChange={e => RegisterModalStore.setEmail(e.target.value)}
        />
        <p className='p'>Password</p>
        <input
          type={showPassword ? 'text' : 'password'}
          className="input"
          value={RegisterModalStore.password}
          onChange={e => RegisterModalStore.setPassword(e.target.value)}
        />
        <p className='p'>Confirm password</p>
        <input
          type={showConfirmPassword ? 'text' : 'password'}
          className="input"
          value={RegisterModalStore.confirmPassword}
          onChange={e => RegisterModalStore.setConfirmPassword(e.target.value)}
        />
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={showPassword || showConfirmPassword}
            onChange={togglePasswordVisibility}
            className="show-password-checkbox"
          />
          <span className="show-password-text">Show passwords</span>
        </label>
        <ErrorMessage />
        <div className='button-row'>
          <button onClick={handleRegister} type="button" className='add'>Register</button>
          <button onClick={closeModal} type="button" className='close'>Close</button>
        </div>
    </Modal>
  );
});

export default RegisterModal;
