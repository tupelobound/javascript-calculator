// Ensure FCC test suite is set to correct project
const projectName = "javascript-calculator";
localStorage.setItem("example_project", "Javascript Calculator");

// Declare array that acts as template for the calculator buttons
const buttonArr = [
    {
        id: "clear",
        class: "button",
        name: "C"
    },
    {
        id: "plusMinus",
        class: "button",
        name: "+/-"
    },
    {
        id: "squareRoot",
        class: "button",
        name: "√"
    },
    {
        id: "divide",
        class: "button operator",
        name: "÷"
    },
    {
        id: "seven",
        class: "button number",
        name: "7"
    },
    {
        id: "eight",
        class: "button number",
        name: "8"
    },
    {
        id: "nine",
        class: "button number",
        name: "9"
    },
    {
        id: "multiply",
        class: "button operator",
        name: "x"
    },
    {
        id: "four",
        class: "button number",
        name: "4"
    },
    {
        id: "five",
        class: "button number",
        name: "5"
    },
    {
        id: "six",
        class: "button number",
        name: "6"
    },
    {
        id: "subtract",
        class: "button operator",
        name: "-"
    },
    {
        id: "one",
        class: "button number",
        name: "1"
    },
    {
        id: "two",
        class: "button number",
        name: "2"
    },
    {
        id: "three",
        class: "button number",
        name: "3"
    },
    {
        id: "add",
        class: "button operator",
        name: "+"
    },
    {
        id: "zero",
        class: "button number",
        name: "0"
    },
    {
        id: "decimal",
        class: "button",
        name: "."
    },
    {
        id: "equals",
        class: "button",
        name: "="
    }
];

// Global variables for calculations
let calc = [];
let justFinished = false;

// Create class to wrap entire app
class App extends React.Component {
    constructor(props) {
        super(props);
        // set initial states
        this.state = {
            display: "0",
            calculation: []
        };
        // bind functions
        this.handleClick = this.handleClick.bind(this);
    }

    // Function to handle button clicks
    handleClick = event => {
        let current = "";
        // Function to handle clicks of operator buttons
        const operatorFunction = sign => {
            // Reusable function for putting the display into the current calculation
            const displayToCalc = () => {
                this.setState({
                    display: "",
                    calculation: calc
                });
            };
            if (justFinished == true) { // check if the equals button has recently been pressed
                calc = [this.state.display, sign]; // reset the calc array to only include the display and operator
                displayToCalc();
                justFinished = false; // reset the status of equals being pressed recently
            } else { // if equals hasn't been pressed recently
                calc.push(this.state.display, sign); // update the calc array without reset
                displayToCalc();
            }
        };

        switch (event.target.innerHTML) {
            // if the clear button is pressed:
            case "C":
                // reset state and global variables
                this.setState({
                    display: "0",
                    calculation: []
                });
                calc = [];
                break;
            // if any of the number buttons are pressed:
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
            case "0":
                if (justFinished == true) { // check if the equals button has been recently pressed, if so:
                    current = event.target.innerHTML;
                    this.setState({ // reset the state and start a new calculation
                        display: current,
                        calculation: []
                    });
                    calc = [];
                    justFinished = false; // update status of equals being recently pressed
                } else { // otherwise:
                    if (this.state.display == "0" || this.state.display == "error") { // check if the display contains a zero or error message, if so:
                        this.setState({ // set the display to whichever button was pressed
                            display: event.target.innerHTML
                        });
                    } else { // otherwise, add the button press to the contents of the display
                        current = this.state.display;
                        this.setState({
                            display: current + event.target.innerHTML
                        });
                    }
                }
                break;
            // handle presses of the decimal button
            case ".":
                if (this.state.display.indexOf(".") == -1) { // check of the display already contains a decimal, if not:
                    current = this.state.display;
                    this.setState({ // allow display to be updated with a decimal point
                        display: current + event.target.innerHTML
                    });
                }
                break;
            // handle presses of the operator buttons using the function declared earlier
            case "+":
                operatorFunction("+");
                break;
            case "-":
                operatorFunction("-");
                break;
            case "x":
                operatorFunction("*");
                break;
            case "÷":
                operatorFunction("/");
                break;
            // handle presses of the square root button
            case "√":
                if (this.state.display[0] == "-") { // check of the display value is negative, if so:
                    this.setState({
                        display: "error" // display an error message since you can't have a square root of a negative number
                    })
                } else { // otherwise, calculate the square root and set the display to the result
                    current = math.sqrt(this.state.display);
                    this.setState({
                        display: current
                    });
                }
                break;
            // handle the toggling of the display to positive/negative values
            case "+/-":
                if (this.state.display == "0") { // check of display is zero'd, if so, don't do anything
                    break;
                }
                if (this.state.display[0] != "-") { // otherwise, check if the display is positive, if so make it negative
                    current = "-" + this.state.display;
                    this.setState({
                        display: current
                    });
                } else { // otherwise, make it negagive
                    current = this.state.display.slice(1);
                    this.setState({
                        display: current
                    });
                }
                break;
            // handle presses of the equals key
            case "=":
                calc.push(this.state.display); // push the display to the calculation array before final processing

                let opRegEx = /[\+\-\*\/]{2,}/g; // set up a regular expression to check for runs of operators
                let calcString = calc.join(""); // create a string from the calculation array
                let matches = calcString.match(opRegEx); // create an array of matches of runs of operators

                if (matches) { // check if there are any runs of operators, if so:
                    let newCalcString = matches.reduce((acc, curr) => { // iterate over the matches array
                        if (curr[curr.length - 1] != "-") { // check if the final operator is a minus, if not:
                            return acc.replace(curr, curr.slice(-1)); // replace the operator run with just the final operator in the run
                        } else { // otherwise, allow the run
                            return acc;
                        }
                    }, calcString); // initialize the accumulator as the calculation string
                    this.setState({ // show the result of the calculation in the display
                        display: math.round(math.evaluate(newCalcString), 4),
                        calculation: calc
                    });
                } else { // if there are no runs of operators, do the calculation and display
                    this.setState({
                        display: math.round(math.evaluate(calc.join("")), 4).toString(),
                        calculation: calc
                    });
                }
                justFinished = true; // set the status of the equals button having been pressed recentlty
                break;
        }
    };

    // Render the app
    render() {
        // Map over the buttons array to create the buttons components
        const buttons = buttonArr.map(item => (
            <Button
                id={item.id}
                class={item.class}
                click={this.handleClick}
                name={item.name}
            />
        ));
        return (
            <div id="calc-body">
                <div id="top">
                    <div id="heading">
                        <span id="title">Electronic Calculator</span>
                    </div>
                    <Display
                        current={this.state.display}
                        calculation={this.state.calculation}
                    />
                </div>
                <div id="button-grid">{buttons}</div>
            </div>
        );
    }
}

// Create functional component for the display
const Display = props => {
    return (
        <div id="screen">
            <div id="display">{props.current}</div>
            <div id="calculation">{props.calculation}</div>
        </div>
    );
};

// Create functional component for buttons
const Button = props => {
    return (
        <div id={props.id} className={props.class} onClick={props.click}>
            {props.name}
        </div>
    );
};

// Render the app to the DOM
const rootNode = document.getElementById('app');
const root = ReactDOM.createRoot(rootNode);
root.render(React.createElement(App));