import { makeAutoObservable } from "mobx"



class VariableStore {
  variables = [
    { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
  { value: 'Очень длинная переменная', label: 'Очень длинная переменная' }];

  constructor(){
    makeAutoObservable(this)
  }

  addVar(variable : Variable) {
    this.variables.push(variable)
  }

  deleteVar(variable : Variable) {
    const index = this.variables.indexOf(variable, 0);
    if (index > -1) {
      this.variables.splice(index, 1);
    }
  }
}

export default new VariableStore()
