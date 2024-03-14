import { makeAutoObservable } from "mobx"

type Variable = {
  id: number, value: string, label: string
}

class VariableStore {
  variables = [
    { id: 1, value: 'chocolate', label: 'Chocolate' },
  { id: 2, value: 'strawberry', label: 'Strawberry' },
  { id: 3, value: 'vanilla', label: 'Vanilla' },
  { id: 4, value: 'Очень длинная переменная', label: 'Очень длинная переменная' }];

  newIdCounter = 5

  constructor(){
    makeAutoObservable(this)
  }

  addVar(label : string) {
    this.newIdCounter += 1
    const newVar = {
      id : this.newIdCounter,
      value: label,
      label
    }
    this.variables.push(newVar)
  }

  deleteVar(variableId : number) {
    const result = this.variables.filter(variable => variable.id !== variableId);
    this.variables = result
  }

  getVar(variableId : number) {
    return this.variables.filter(variable => variable.id === variableId)[0]
  }

  getVarName(variableId : number) {
    return this.variables.filter(variable => variable.id === variableId)[0]?.label
  }

  renameVar(variableId : number, newName : string) {
    this.variables.filter(variable => variable.id === variableId)[0].label = newName
  }

  getVariablesForExport() {
    return this.variables
  }

  setVariables(variables: Variable[]) {
    if (variables === undefined) {
      console.log("Error")
      return
    }
    this.variables = variables
  }
}

export default new VariableStore()
