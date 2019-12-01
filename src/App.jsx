import React, { Component } from 'react';
import './App.css';
import { Button } from './components/Button';
import { Input } from './components/Input';
import { ClearButton } from './components/ClearButton';
import * as math from 'mathjs';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: '',
      history: [],
    };
  }

  //Method used to update state with input from calculator.
  addToInput = val => {
    const input = this.state.input;
    if (this.validateInput(input, val)) {
      this.setState({ input: input + val })
    }
  }

  //Method used to validate input - validates that multiple operators and decimals can not be used after each other.
  validateInput = (input, val) => {
    let isValid = true;

    if (input.length > 0 && val === input.slice(-1) &&
      (val === '.' || val === '+' || val === '-' || val === '/' || val === '*')) {
      isValid = false;
    }
    //TODO Add Validation for multiple decimals in input (ex 2.2.0)

    return isValid;
  }

  //Method used when equals button is clicked to perform operations.
  handleEquals = () => {
    let input = this.state.input;
    
    if (input.length > 0) {
      //Used to remove trailing operator in calculation (ex: 2+3- would return 2+3)
      if (input.slice(-1) === '.' || input.slice(-1) === '/' ||
        input.slice(-1) === '*' || input.slice(-1) === '+' || input.slice(-1) === '-') {
        input = input.substring(0, input.length - 1);
      }

      let output = math.evaluate(input);

      this.setState({
        history: this.state.history.unshift(input + ' = ' + output),
        input: output
      })

      this.setState(this.state);
    }
  }

  //Method used to retrieve history of the last ten calculations.
  retrieveHistory() {
    let history = this.state.history;
    
    if (history.length > 9) {
      history = history.slice(0, 10);
    }

    return (
      <>
        {
          history.length == 0
            ?
            <></>
            :
            <>
              <h3>Calculation History:</h3>
              <ul>
                {
                  history.map(function (name, index) {
                    return <li key={index}>{name}</li>;
                  })
                }
              </ul>
            </>
        }
      </>
    )
  }

  render() {
    return (
      <div className="app">
        <div className="calc-wrapper">
          <Input input={this.state.input}></Input>
          <div className="row">
            <Button handleClick={this.addToInput}>7</Button>
            <Button handleClick={this.addToInput}>8</Button>
            <Button handleClick={this.addToInput}>9</Button>
            <Button handleClick={this.addToInput}>/</Button>
          </div>
          <div className="row">
            <Button handleClick={this.addToInput}>4</Button>
            <Button handleClick={this.addToInput}>5</Button>
            <Button handleClick={this.addToInput}>6</Button>
            <Button handleClick={this.addToInput}>*</Button>
          </div>
          <div className="row">
            <Button handleClick={this.addToInput}>1</Button>
            <Button handleClick={this.addToInput}>2</Button>
            <Button handleClick={this.addToInput}>3</Button>
            <Button handleClick={this.addToInput}>+</Button>
          </div>
          <div className="row">
            <Button handleClick={this.addToInput}>.</Button>
            <Button handleClick={this.addToInput}>0</Button>
            <Button handleClick={() => this.handleEquals()}>=</Button>
            <Button handleClick={this.addToInput}>-</Button>
          </div>
          <div className="row">
            <ClearButton handleClear={() => this.setState({ input: '' })}>Clear</ClearButton>
          </div>
        </div>
        <div className="history">
          {this.retrieveHistory()}
        </div>
      </div>
    );
  }
}

export default App;