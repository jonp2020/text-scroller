# text-scroller

This app is displays a sentence as a ticker tape scroller where the text moves from right to left. It takes a string which has style tags wrapped around some words or phrases. These styles are applied when the text displays in the scroller.

The user can change the width and speed of the scroller using the input controls in the browser. The width is based on the number of characters in the string provided. There are 10 speed levels which set the interval in which the scroller updates and moves characters along the scroller.

Currently, if you want to change the text that is displayed, you will need to update the string in the code itself. This can be done by changing the string in the providedText useState in App.jsx (line 136). 

It was written in React and set up using Vite.

To get started:

- Clone this repo
- cd into the folder where you cloned the repo 
- In the terminal run ```npm install```
- In the terminal run ```npm run dev```
- Open the local url listed in terminal when you ran the command in the previous step

To do:
- Add input field for user to provide their own sentence which would update the text displayed in the scroller
- Add more speed levels
- Fix issue with text displayed immediately after updating the screen width using the input control in the browser. Currently when you change the width, the next character in the scroller is a few places ahead of the previous character in the string that is displayed in the scroller.
