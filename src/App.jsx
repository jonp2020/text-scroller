import { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const numOfCols = () => {
    const arr = Array.from({ length: width + 1 }).map(() => {});
    return arr;
  };

  const splitTextIntoArr = () => {
    const replaceBstartTag = providedText.replace(/\[B\]/g, " [B] ");
    const replaceBendTag = replaceBstartTag.replace(/\[\/B\]/g, " [/B] ");
    const replaceUstartTag = replaceBendTag.replace(/\[U\]/g, " [U] ");
    const replaceUendTag = replaceUstartTag.replace(/\[\/U\]/g, " [/U] ");
    const replaceCendTage = replaceUendTag.replace(/\[\/C\]/g, " [/C] ");

    let boldApplied = false;
    let underlineApplied = false;
    let colorApplied = "#000000";

    const textWithStyles = [];

    replaceCendTage.split(" ").forEach((item) => {
      if (item === "[B]") {
        boldApplied = true;
        return;
      }
      if (item === "[/B]") {
        boldApplied = false;
        return;
      }
      if (item === "[U]") {
        underlineApplied = true;
        return;
      }
      if (item === "[/U]") {
        underlineApplied = false;
        return;
      }

      if (item.slice(0, 3) === "[C:") {
        const updatedColor = item.slice(3, 10);
        colorApplied = updatedColor;
        item = item.slice(11);
      }
      if (item === "[/C]") {
        colorApplied = "#000000";
        return;
      }

      const letterArr = item.split("");

      letterArr.forEach((letter) => {
        const itemObj = {};
        itemObj.text = letter;
        itemObj.boldApplied = boldApplied;
        itemObj.underlineApplied = underlineApplied;
        itemObj.colorApplied = colorApplied;
        textWithStyles.push(itemObj);
      });

      const space = {};
      space.text = " ";
      space.space = true;
      textWithStyles.push(space);
    });

    return textWithStyles;
  };

  const handleScroll = () => {
    const newTextArr = [...textArr];

    newTextArr.shift();
    newTextArr.push(text[count]);

    let newCount;
    if (count !== text.length) {
      newCount = count + 1;
    } else {
      newCount = 0;
    }
    return callback(newTextArr, newCount);
  };

  const updateWidth = (e) => {
    clearInterval(intervalScroller);

    const textCopy = [...text];
    let value = e.target.value;

    if (isNaN(parseInt(value))) {
      value = 0;
    } else {
      value = parseInt(value);
    }

    const inputtedWidth = value + count;
    const scrollPositionCheck =
      count + value < text.length && inputtedWidth < text.length;

    const newLengthArr = scrollPositionCheck
      ? textCopy.slice(count, inputtedWidth)
      : textCopy.slice(0, value);

    setWidth(value);
    setTextArr(newLengthArr);

    const updatedNextTick = () => {
      savedCallback.current();
    };

    let newWidthScroller = setInterval(updatedNextTick, scrollSpeed * 50);
    setIntervalScroller(newWidthScroller);
  };

  const updateScrollSpeed = (e) => {
    clearInterval(intervalScroller);
    setScrollSpeed(e.target.value);

    const updatedNextTick = () => {
      savedCallback.current();
    };

    let newScroller = setInterval(updatedNextTick, scrollSpeed * 50);

    setIntervalScroller(newScroller);
  };

  // Example sentences:
  // "Welcome on board this service to [B]London[/B]. Please have [U]all[/U] tickets and passes ready for inspection. This service is expected to depart [C:#00FF00]on time[/C]"

  // "[C:#FF0000]All of this text is Red, but [C:#0000FF][B][U]THIS[/U][/B] text is Blue.[/C][/C]"

  // Change the string for the providedText usesState below to display a different message
  const [providedText, setProvidedText] = useState(
    "Welcome on board this service to [B]London[/B]. Please have [U]all[/U] tickets and passes ready for inspection. This service is expected to depart [C:#00FF00]on time[/C]"
  );
  const [intervalScroller, setIntervalScroller] = useState(null);
  const [text, setText] = useState(splitTextIntoArr);
  const [count, setCount] = useState(0);
  const [width, setWidth] = useState(75);
  const [textArr, setTextArr] = useState(numOfCols);
  const [scrollSpeed, setScrollSpeed] = useState(5);
  const savedCallback = useRef();

  function callback(text, count) {
    setCount(count);
    setTextArr(text);
  }

  useEffect(() => {
    savedCallback.current = handleScroll;
  });

  useEffect(() => {
    const nextTick = () => {
      savedCallback.current();
    };

    let scroller = setInterval(nextTick, scrollSpeed * 50);
    setIntervalScroller(scroller);
    return () => clearInterval(scroller);
  }, []);

  return (
    <div className="App">
      <h1>Text Scroller</h1>
      <ul className="appInfo">
        <li>
          Change the screen width and speed of the scroller by updating the
          input fields below.
        </li>
        <li>
          To change the scrolling text, currently you will need to update the
          providedText useState in the code (App.jsx file line 136)
        </li>
        <li>
          Example sentence 1: "Welcome on board this service to [B]London[/B].
          Please have [U]all[/U] tickets and passes ready for inspection. This
          service is expected to depart [C:#00FF00]on time[/C]"
        </li>
        <li>
          Example sentence 2: "[C:#FF0000]All of this text is Red, but
          [C:#0000FF][B][U]THIS[/U][/B] text is Blue.[/C][/C]"
        </li>
      </ul>

      <label className="inputLabel" htmlFor="screenWidth">
        Enter screen width:
      </label>
      <input
        id="screenWidth"
        type="number"
        name="screenWidth"
        onChange={updateWidth}
        min="1"
        max={text.length < 150 ? text.length - 1 : "150"}
        value={width}
      />
      <label className="inputLabel" htmlFor="speed">
        Enter scroll speed:
      </label>
      <input
        id="speed"
        type="number"
        name="speed"
        min="1"
        max="10"
        onChange={updateScrollSpeed}
        value={scrollSpeed}
      />

      <section className="scroll-section">
        <div className="scrolling-container" style={{ width: `${width}%` }}>
          {textArr.length &&
            textArr.map((item, index) => (
              <p
                key={`textIndex${index}`}
                id={`textArrIndex-${index}`}
                className="text"
                style={{
                  fontWeight: item && item.boldApplied ? "bold" : 200,
                  textDecoration:
                    item && item.underlineApplied ? "underline" : "none",
                  color:
                    item && item.colorApplied
                      ? `${item.colorApplied}`
                      : "#000000",
                }}
              >
                <span className="textSpan"></span>
                {item || (item && item.space) ? item.text : " "}
                {item && item.space && <span className="whiteSpace"> </span>}
              </p>
            ))}
        </div>
      </section>
    </div>
  );
}

export default App;
