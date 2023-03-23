# text-scroller

This app is displays a sentence as a ticker tape scroller where the text moves from right to left. It takes a string which has style tags wrapped around some words or phrases. These styles are applied when the text displays in the scroller.

The user can change the width and speed of the scroller using the input controls in the browser. The width is based on the number of characters in the string provided. There are 10 speed levels which set the interval in which the scroller updates and moves characters along the scroller.

Currently, if you want to change the text that is displayed, you will need to update the string in the code itself. This can be done by changing the string in the providedText useState in App.jsx. 

It was written in React and set up using Vite.

