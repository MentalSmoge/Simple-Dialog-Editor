import { makeAutoObservable } from 'mobx';
import axios from 'axios';

declare global {
    interface Window {
        electron: {
            getStoreValue: (key: string) => Promise<any>;
            setStoreValue: (key: string, value: any) => void;
        };
    }
}

class AuthModalStore {
  isOpen = false;
  email = '';
  password = '';
  errorMessage = '';
  token = null;

  constructor() {
    makeAutoObservable(this);
  }

  clearErrorMessage() {
    this.errorMessage = '';
  }

  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
    this.clearFields();
  }

  setEmail(email) {
    this.email = email;
  }

  setPassword(password) {
    this.password = password;
  }

  clearFields() {
    this.email = '';
    this.password = '';
    this.clearErrorMessage();
  }

  async login() {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/auth/login/', {
        email: this.email,
        password: this.password
      });

      const result = response.data;

      if (result.status === 'success') {
        // const tok = window.electron.getStoreValue('token');
        window.electron.setStoreValue('token', result.token);
        this.closeModal();
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        this.errorMessage = error.response.data.message;
      } else {
        this.errorMessage = 'An error occurred during login';
      }
    }
  }
}

export default new AuthModalStore();
