import { React, useState } from 'react'
import './App.css'
import { sqrt, round, evaluate } from 'mathjs'
import Display from './Display'
import Button from './Button'

// Global variables for calculations
let calc = []
let justFinished = false
const opRegEx = /[+\-*/]{2,}/g // set up a regular expression to check for runs of operators
let calcString
let newCalcString
let matches

const App = () => {
  const buttonArr = [
    {
      id: 'clear',
      class: 'button',
      name: 'C'
    },
    {
      id: 'plusMinus',
      class: 'button',
      name: '+/-'
    },
    {
      id: 'squareRoot',
      class: 'button',
      name: '√'
    },
    {
      id: 'divide',
      class: 'button operator',
      name: '÷'
    },
    {
      id: 'seven',
      class: 'button number',
      name: '7'
    },
    {
      id: 'eight',
      class: 'button number',
      name: '8'
    },
    {
      id: 'nine',
      class: 'button number',
      name: '9'
    },
    {
      id: 'multiply',
      class: 'button operator',
      name: 'x'
    },
    {
      id: 'four',
      class: 'button number',
      name: '4'
    },
    {
      id: 'five',
      class: 'button number',
      name: '5'
    },
    {
      id: 'six',
      class: 'button number',
      name: '6'
    },
    {
      id: 'subtract',
      class: 'button operator',
      name: '-'
    },
    {
      id: 'one',
      class: 'button number',
      name: '1'
    },
    {
      id: 'two',
      class: 'button number',
      name: '2'
    },
    {
      id: 'three',
      class: 'button number',
      name: '3'
    },
    {
      id: 'add',
      class: 'button operator',
      name: '+'
    },
    {
      id: 'zero',
      class: 'button number',
      name: '0'
    },
    {
      id: 'decimal',
      class: 'button',
      name: '.'
    },
    {
      id: 'equals',
      class: 'button',
      name: '='
    }
  ]

  // Set initial states
  const [state, setState] = useState({ display: '0', calculation: [] })
  // const [calculation, setCalculation] = useState([])

  // Function to handle button clicks
  const handleClick = e => {
    let current = ''
    // Function to handle clicks of operator buttons
    const operatorFunction = sign => {
      // Reusable function for putting the display into the current calculation
      const displayToCalc = () => {
        setState({ display: '', calculation: calc })
      }
      if (justFinished === true) { // check if the equals button has recently been pressed
        calc = [state.display, sign] // reset the calc array to only include the display and operator
        displayToCalc()
        justFinished = false // reset the status of equals being pressed recently
      } else { // if equals hasn't been pressed recently
        calc.push(state.display, sign) // update the calc array without reset
        displayToCalc()
      }
    }

    switch (e.target.innerHTML) {
      // if the clear button is pressed:
      case 'C':
        // reset state and global variables
        setState({ display: '0', calculation: [] })
        calc = []
        break
      // if any of the number buttons are pressed:
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
      case '0':
        // check if the equals button has been recently pressed
        if (justFinished === true) {
          current = e.target.innerHTML
          setState({ display: current, calculation: [] })
          calc = []
          justFinished = false // update status of equals being recently pressed
        } else { // otherwise:
          // check if the display contains a zero or error message
          if (state.display === '0' || state.display === 'error') {
            setState({ display: e.target.innerHTML, calculation: calc }) // set the display to whichever button was pressed
          } else { // otherwise, add the button press to the contents of the display
            current = state.display
            setState({ display: current + e.target.innerHTML, calculation: calc })
          }
        }
        break
      // handle presses of the decimal button
      case '.':
        if (state.display.indexOf('.') === -1) { // check if the display already contains a decimal, if not:
          current = state.display
          setState({ display: current + e.target.innerHTML, calculation: calc }) // allow display to be updated with a decimal point
        }
        break
      // handle presses of the operator buttons using the function declared earlier
      case '+':
        operatorFunction('+')
        break
      case '-':
        operatorFunction('-')
        break
      case 'x':
        operatorFunction('*')
        break
      case '÷':
        operatorFunction('/')
        break
      // handle presses of the square root button
      case '√':
        if (state.display[0] === '-') { // check of the display value is negative, if so:
          setState({ display: 'error', calculation: calc }) // display an error message since you can't have a square root of a negative number
        } else {
          current = sqrt(state.display)
          setState({ display: current, calculation: calc })
        }
        break
        // handle the toggling of the display to positive/negative values
      case '+/-':
        if (state.display === '0') { // check of display is zero'd, if so, don't do anything
          break
        }
        if (state.display[0] !== '-') { // otherwise, check if the display is positive, if so make it negative
          current = '-' + state.display
          setState({ display: current, calculation: calc })
        } else { // otherwise, make it negagive
          current = state.display.slice(1)
          setState({ display: current, calculation: calc })
        }
        break
      // handle presses of the equals key
      case '=':
        calc.push(state.display) // push the display to the calculation array before final processing
        calcString = calc.join('') // create a string from the calculation array
        matches = calcString.match(opRegEx) // create an array of matches of runs of operators

        if (matches) { // check if there are any runs of operators, if so:
          newCalcString = matches.reduce((acc, curr) => { // iterate over the matches array
            if (curr[curr.length - 1] !== '-') { // check if the final operator is a minus, if not:
              return acc.replace(curr, curr.slice(-1)) // replace the operator run with just the final operator in the run
            } else { // otherwise, allow the run
              return acc
            }
          }, calcString) // initialize the accumulator as the calculation string
          setState({ display: round(evaluate(newCalcString), 4).toString(), calculation: calc })
        } else { // if there are no runs of operators, do the calculation and display
          setState({
            display: round(evaluate(calc.join('')), 4).toString(),
            calculation: calc
          })
        }
        justFinished = true // set the status of the equals button having been pressed recently
        break
    }
    console.log(document.getElementById('display'))
  }

  // Map over the buttons array to create the buttons components
  const buttons = buttonArr.map(item => (
    <Button
        id={item.id}
        class={item.class}
        name={item.name}
        click={handleClick}
        key={item.id}
    />
  ))

  return (
    <div id="calc-body">
      <div id="top">
        <div id="heading">
          <h1 id="title">Electronic Calculator</h1>
        </div>
        <Display
          current={state.display}
          calculation={state.calculation}
        />
      </div>
      <div id="button-grid">{buttons}</div>
    </div>
  )
}

export default App
