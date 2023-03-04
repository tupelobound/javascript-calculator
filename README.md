# javascript-calculator

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/4a8ce023b785479393657a73205bff1b)](https://www.codacy.com/gh/tupelobound/javascript-calculator/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=tupelobound/javascript-calculator&amp;utm_campaign=Badge_Grade)

freeCodeCamp Front End Development Libraries project - Build a JavaScript Calculator

This project was completed as part of freeCodeCamp's Front End Development Libraries certificate, focused on learning frond end libraries such as React.

The project brief was to fulfill the following user stories:

1.  My calculator should contain a clickable element containing an = (equal sign) with a corresponding id="equals".
2.  My calculator should contain 10 clickable elements containing one number each from 0-9, with the following corresponding IDs: id="zero", id="one", id="two", id="three", id="four", id="five", id="six", id="seven", id="eight", and id="nine".
3.  My calculator should contain 4 clickable elements each containing one of the 4 primary mathematical operators with the following corresponding IDs: id="add", id="subtract", id="multiply", id="divide".
4.  My calculator should contain a clickable element containing a . (decimal point) symbol with a corresponding id="decimal".
5.  My calculator should contain a clickable element with an id="clear".
6.  My calculator should contain an element to display values with a corresponding id="display".
7.  At any time, pressing the clear button clears the input and output values, and returns the calculator to its initialized state; 0 should be shown in the element with the id of display.
8.  As I input numbers, I should be able to see my input in the element with the id of display.
9.  h the id of display.
10. When inputting numbers, my calculator should not allow a number to begin with multiple zeros.
11. When the decimal element is clicked, a . should append to the currently displayed value; two . in one number should not be accepted.
12. I should be able to perform any operation (+, -, *, /) on numbers containing decimal points.
13. If 2 or more operators are entered consecutively, the operation performed should be the last operator entered (excluding the negative (-) sign). For example, if 5 + * 7 = is entered, the result should be 35 (i.e. 5 * 7); if 5 * - 5 = is entered, the result should be -25 (i.e. 5 * (-5)).
14. Pressing an operator immediately following = should start a new calculation that operates on the result of the previous evaluation.
15. My calculator should have several decimal places of precision when it comes to rounding (note that there is no exact standard, but you should be able to handle calculations like 2 / 7 with reasonable precision to at least 4 decimal places).

I originally built this project using a Codepen starter project and then built a version locally, adding React via script tags. Original version used a class component to wrap the app. This version was created using create-react-app, and uses functional components and hooks.

Work is needed on some functionality around repeated presses of the 'equals' key and using the decimal point on the result of a calculation.
