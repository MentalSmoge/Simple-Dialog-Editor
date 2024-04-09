import { makeAutoObservable } from "mobx"

export type Variable = {
  id: number, value: string, label: string
}

class VariableStore {
  variables = [
    {
      "id": 4,
      "value": "Настроение",
      "label": "Настроение"
    }];

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

  getVariablesForSave() {
    return this.variables
  }

  getVariablesForExport() {
    const returnVariables = []
    this.variables.forEach(variable => {
      returnVariables.push({
        id : variable.id,
        name : variable.label
      })
    });
    return returnVariables
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
