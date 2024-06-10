import { makeAutoObservable } from 'mobx';
import axios from 'axios';
import AuthModalStore from '../Modal_Login/AuthModalStore';

declare global {
  interface Window {
      electron: {
          getStoreValue: (key: string) => Promise<any>;
          setStoreValue: (key: string, value: any) => void;
      };
  }
}

class RegisterModalStore {
  isOpen = false;
  username = '';
  type = "1";
  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';
  token = null;

  constructor() {
    makeAutoObservable(this);
  }

  // registrationSuccess = false;

  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
    this.clearFields();
  }

  setUsername(username) {
    this.username = username;
  }

  setEmail(email) {
    this.email = email;
  }

  setPassword(password) {
    this.password = password;
  }

  setConfirmPassword(confirmPassword) {
    this.confirmPassword = confirmPassword;
  }

  setErrorMessage(message) {
    this.errorMessage = message;
  }

  clearErrorMessage() {
    this.errorMessage = '';
  }

  clearFields() {
    this.username = '';
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
    this.clearErrorMessage();
  }

  async register() {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/auth/signup/', {
        username: this.username,
        type: "1",
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword,
      });

      const result = response.data;

      if (result.status === 'success') {
        this.closeModal();
        AuthModalStore.openModal()
      }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      this.errorMessage = error.response.data.message;
    } else {
      this.errorMessage = 'Registration failed. Please try again';}
    }
  }
}

export default new RegisterModalStore();
