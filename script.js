class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
      this.previousOperandTextElement = previousOperandTextElement
      this.currentOperandTextElement = currentOperandTextElement
      this.clear()
    } /*pegara todos os imputes para as funçoes, como de subtrair, adição... pegando o aquelas 
    operaçoes que estao com o portugues meio defusado, sendo essa parte o display, onde estara
    todos os numeros. Parte 2*/
  
    clear() {
      this.currentOperand = ''         
      this.previousOperand = ''           
      this.operation = undefined
    } /*funçao do botao de apagar tudos, essa primeira linha é referente ao numero em si da calcuradora
    a segunda que é a previus, aquela de cima, todas foram transformada para uma string, mas vazia parte 3,
    dados de cada operaão do que vai acontecer*/
  
    delete() {
      this.currentOperand = this.currentOperand.toString().slice(0, -1) 
    }/*parte 11, mas apenas refente como acontecer o delete, pegando o ultimo numero digitado e apagando*/
  
    appendNumber(number) {
      if (number === '.' && this.currentOperand.includes('.')) return
      this.currentOperand = this.currentOperand.toString() + number.toString()
    } /*abre as portas para colocar o numeros la no display, mas se deixamos como this.rurrentOperanto = number,
    apenas amazenara um numero por vez, como cloquei no 1 e depois em outro, o 1 sera apagado e esse novo 
    ficara no lugar. Mas essa segunda linha ja deixa a possibilidade de colocar ainda mais numeros, essa primeira linha
    é referente a questao do Ponto ., pois o limete é 1. Mas a questao das funçoes nao acontecera nada Parte 6 */
  
    chooseOperation(operation) {
      if (this.currentOperand === '') return
      if (this.previousOperand !== '') {
        this.compute()
      }
      this.operation = operation
      this.previousOperand = this.currentOperand
      this.currentOperand = ''
    }  /*Parte 8, as duas if ajuda a nao bugar a calculadora, pois sem elas, "poderiamos" colocar duas operaçao
    ao mesmo tempo, todas estao sendo transformada em string, == '', aquela parte this.computer, ajuda aos if
    tipo, quando fazendo uma conta em colocamos em =, termos o resultado e aparece na parte principal, mas quando
    clicamos em outra operaçao, essa de baixo sera jogado direto para cima com o resultado, pelo fato da 
    (this.previousOperand !== '') {This.compute(). Todas as parte agora estao meio que funcionando, junta com a 
      Parte 6 */
  
    compute() {
      let computation
      const prev = parseFloat(this.previousOperand)
      const current = parseFloat(this.currentOperand)
      if (isNaN(prev) || isNaN(current)) return
      switch (this.operation) {
        case '+':
          computation = prev + current
          break
        case '-':
          computation = prev - current
          break
        case '*':
          computation = prev * current
          break
        case '÷':
          computation = prev / current
          break
        default:
          return
      }
      this.currentOperand = computation
      this.operation = undefined
      this.previousOperand = ''
    } /*Parte 10, responsavel por tudo que vai acontecer, do que cada operaçao vai fazer*/
  
    getDisplayNumber(number) {
      const stringNumber = number.toString()
      const integerDigits = parseFloat(stringNumber.split('.')[0])
      const decimalDigits = stringNumber.split('.')[1]
      let integerDisplay
      if (isNaN(integerDigits)) {
        integerDisplay = ''
      } else {
        integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 }) /*Linguagem*/
      }
      if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`
      } else {
        return integerDisplay
      }
    } /*Parte 12, ultimas partes da calculadora, todas as outras feitas anteriomente estavam referetente mais
    a questao do que seria aquilo, onde guarda, mas o local que ficara armazenado o numero sera aqui, basicamente
    sem ela, se voce digitar um numero, nao ia acontecer nada, pois o numero nao teria um local para ficar*/
  
    updateDisplay() {
      this.currentOperandTextElement.innerText =
        this.getDisplayNumber(this.currentOperand)
      if (this.operation != null) {
        this.previousOperandTextElement.innerText =   /*Referente a parte 8, mas ficara agora no display guardado*/
          `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
      } else {  /*aqui aparagar aquele numerozinho em cima, foi construido apos a parte 12*/
        this.previousOperandTextElement.innerText = ''
      }
    }
  } /*Parte responsavel de onde as coisas ficarao, no caso os numeros colocados. Parte 5 */
  
  /*dados de todos os botoes, parte 1*/
  const numberButtons = document.querySelectorAll('[data-numero]')
  const operationButtons = document.querySelectorAll('[data-operador]')
  const equalsButton = document.querySelector('[data-equaçao]')
  const deleteButton = document.querySelector('[data-apagador]')
  const allClearButton = document.querySelector('[data-limpar]')
  const previousOperandTextElement = document.querySelector('[data-numero-anterior]')
  const currentOperandTextElement = document.querySelector('[data-numero-atual]')
  
  const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)
  
  numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText)
      calculator.updateDisplay()
    })
  }) /*funçao de colocar os numeros, como 1,2,3, todos
  Parte 4, essa trara a possibilidade de vermos o numeros, talvez como a memoria
  quando clicamos esse numeros ira para essa parte, pois se tiramos, o numero nao ira para nenhum lugar */
  
  operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText)
      calculator.updateDisplay()
    })
  }) /*Essa parte aqui sera responsavel de escolheremos o tipo de operaçao, alem de atualizar o display. 
  Parte 7 */
  
  equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
  }) /*Parte 9, dessa parte para as linhas abaixo, sera tudo jogado ao cumpeter, referente a questao de deletar
  e limpar, mas essa primeira aqui, autualizara o display, se caso estevisse sem elas, nao iria funcionar cada
  uma dessas funçoes*/
  
  allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
  })
  
  deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
  }) /*Referente a parte 11*/