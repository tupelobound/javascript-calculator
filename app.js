"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
// Ensure FCC test suite is set to correct project
var projectName = "javascript-calculator";
localStorage.setItem("example_project", "Javascript Calculator");

// Declare array that acts as template for the calculator buttons
var buttonArr = [{
  id: "clear",
  "class": "button",
  name: "C"
}, {
  id: "plusMinus",
  "class": "button",
  name: "+/-"
}, {
  id: "squareRoot",
  "class": "button",
  name: "√"
}, {
  id: "divide",
  "class": "button operator",
  name: "÷"
}, {
  id: "seven",
  "class": "button number",
  name: "7"
}, {
  id: "eight",
  "class": "button number",
  name: "8"
}, {
  id: "nine",
  "class": "button number",
  name: "9"
}, {
  id: "multiply",
  "class": "button operator",
  name: "x"
}, {
  id: "four",
  "class": "button number",
  name: "4"
}, {
  id: "five",
  "class": "button number",
  name: "5"
}, {
  id: "six",
  "class": "button number",
  name: "6"
}, {
  id: "subtract",
  "class": "button operator",
  name: "-"
}, {
  id: "one",
  "class": "button number",
  name: "1"
}, {
  id: "two",
  "class": "button number",
  name: "2"
}, {
  id: "three",
  "class": "button number",
  name: "3"
}, {
  id: "add",
  "class": "button operator",
  name: "+"
}, {
  id: "zero",
  "class": "button number",
  name: "0"
}, {
  id: "decimal",
  "class": "button",
  name: "."
}, {
  id: "equals",
  "class": "button",
  name: "="
}];

// Global variables for calculations
var calc = [];
var justFinished = false;

// Create class to wrap entire app
var App = /*#__PURE__*/function (_React$Component) {
  _inherits(App, _React$Component);
  var _super = _createSuper(App);
  function App(props) {
    var _this;
    _classCallCheck(this, App);
    _this = _super.call(this, props);
    // set initial states
    _this.handleClick = function (event) {
      var current = "";
      // Function to handle clicks of operator buttons
      var operatorFunction = function operatorFunction(sign) {
        // Reusable function for putting the display into the current calculation
        var displayToCalc = function displayToCalc() {
          _this.setState({
            display: "",
            calculation: calc
          });
        };
        if (justFinished == true) {
          // check if the equals button has recently been pressed
          calc = [_this.state.display, sign]; // reset the calc array to only include the display and operator
          displayToCalc();
          justFinished = false; // reset the status of equals being pressed recently
        } else {
          // if equals hasn't been pressed recently
          calc.push(_this.state.display, sign); // update the calc array without reset
          displayToCalc();
        }
      };
      switch (event.target.innerHTML) {
        // if the clear button is pressed:
        case "C":
          // reset state and global variables
          _this.setState({
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
          if (justFinished == true) {
            // check if the equals button has been recently pressed, if so:
            current = event.target.innerHTML;
            _this.setState({
              // reset the state and start a new calculation
              display: current,
              calculation: []
            });
            calc = [];
            justFinished = false; // update status of equals being recently pressed
          } else {
            // otherwise:
            if (_this.state.display == "0" || _this.state.display == "error") {
              // check if the display contains a zero or error message, if so:
              _this.setState({
                // set the display to whichever button was pressed
                display: event.target.innerHTML
              });
            } else {
              // otherwise, add the button press to the contents of the display
              current = _this.state.display;
              _this.setState({
                display: current + event.target.innerHTML
              });
            }
          }
          break;
        // handle presses of the decimal button
        case ".":
          if (_this.state.display.indexOf(".") == -1) {
            // check of the display already contains a decimal, if not:
            current = _this.state.display;
            _this.setState({
              // allow display to be updated with a decimal point
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
          if (_this.state.display[0] == "-") {
            // check of the display value is negative, if so:
            _this.setState({
              display: "error" // display an error message since you can't have a square root of a negative number
            });
          } else {
            // otherwise, calculate the square root and set the display to the result
            current = math.sqrt(_this.state.display);
            _this.setState({
              display: current
            });
          }
          break;
        // handle the toggling of the display to positive/negative values
        case "+/-":
          if (_this.state.display == "0") {
            // check of display is zero'd, if so, don't do anything
            break;
          }
          if (_this.state.display[0] != "-") {
            // otherwise, check if the display is positive, if so make it negative
            current = "-" + _this.state.display;
            _this.setState({
              display: current
            });
          } else {
            // otherwise, make it negagive
            current = _this.state.display.slice(1);
            _this.setState({
              display: current
            });
          }
          break;
        // handle presses of the equals key
        case "=":
          calc.push(_this.state.display); // push the display to the calculation array before final processing

          var opRegEx = /[\+\-\*\/]{2,}/g; // set up a regular expression to check for runs of operators
          var calcString = calc.join(""); // create a string from the calculation array
          var matches = calcString.match(opRegEx); // create an array of matches of runs of operators

          if (matches) {
            // check if there are any runs of operators, if so:
            var newCalcString = matches.reduce(function (acc, curr) {
              // iterate over the matches array
              if (curr[curr.length - 1] != "-") {
                // check if the final operator is a minus, if not:
                return acc.replace(curr, curr.slice(-1)); // replace the operator run with just the final operator in the run
              } else {
                // otherwise, allow the run
                return acc;
              }
            }, calcString); // initialize the accumulator as the calculation string
            _this.setState({
              // show the result of the calculation in the display
              display: math.round(math.evaluate(newCalcString), 4),
              calculation: calc
            });
          } else {
            // if there are no runs of operators, do the calculation and display
            _this.setState({
              display: math.round(math.evaluate(calc.join("")), 4).toString(),
              calculation: calc
            });
          }
          justFinished = true; // set the status of the equals button having been pressed recentlty
          break;
      }
    };
    _this.state = {
      display: "0",
      calculation: []
    };
    // bind functions
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_this));
    return _this;
  }

  // Function to handle button clicks
  _createClass(App, [{
    key: "render",
    value:
    // Render the app
    function render() {
      var _this2 = this;
      // Map over the buttons array to create the buttons components
      var buttons = buttonArr.map(function (item) {
        return /*#__PURE__*/React.createElement(Button, {
          id: item.id,
          "class": item["class"],
          click: _this2.handleClick,
          name: item.name
        });
      });
      return /*#__PURE__*/React.createElement("div", {
        id: "calc-body"
      }, /*#__PURE__*/React.createElement("div", {
        id: "top"
      }, /*#__PURE__*/React.createElement("div", {
        id: "heading"
      }, /*#__PURE__*/React.createElement("h1", {
        id: "title"
      }, "Electronic Calculator")), /*#__PURE__*/React.createElement(Display, {
        current: this.state.display,
        calculation: this.state.calculation
      })), /*#__PURE__*/React.createElement("div", {
        id: "button-grid"
      }, buttons));
    }
  }]);
  return App;
}(React.Component); // Create functional component for the display
var Display = function Display(props) {
  return /*#__PURE__*/React.createElement("div", {
    id: "screen"
  }, /*#__PURE__*/React.createElement("div", {
    id: "display"
  }, props.current), /*#__PURE__*/React.createElement("div", {
    id: "calculation"
  }, props.calculation));
};

// Create functional component for buttons
var Button = function Button(props) {
  return /*#__PURE__*/React.createElement("div", {
    id: props.id,
    className: props["class"],
    onClick: props.click
  }, props.name);
};

// Render the app to the DOM
var rootNode = document.getElementById('app');
var root = ReactDOM.createRoot(rootNode);
root.render(React.createElement(App));