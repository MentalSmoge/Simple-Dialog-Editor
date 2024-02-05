import { makeAutoObservable } from "mobx"

interface Variable {
  name: string,
  value : number
}

class VariableStore {
  variables : Array<Variable> = [];

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
