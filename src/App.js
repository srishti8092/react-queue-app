import React, { useState, useEffect } from "react";
import Queue from "./queue";
import "./styles.css";

function App() {
  const [inputText, setInputText] = useState("");
  const [queue, setQueue] = useState(new Queue());
  const [queueDisplay, setQueueDisplay] = useState("");
  const [rightSideDisplay, setRightSideDisplay] = useState("");
  const [successPopup, setSuccessPopup] = useState(false);

  const handleAddButtonClick = () => {
    if (inputText.trim() !== "") {
      const updatedQueue = new Queue();
      updatedQueue.items = [...queue.items];
      updatedQueue.enqueue(inputText.trim());
      setQueue(updatedQueue);
      setInputText("");
      setQueueDisplay(updatedQueue.printQueue());
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!queue.isEmpty()) {
        const polledItem = queue.dequeue();
        setRightSideDisplay(polledItem);
        setQueueDisplay(queue.printQueue());
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [queue]);

  const handleEndButtonClick = () => {
    if (queue.isEmpty()) {
      setSuccessPopup(true);
    } else {
      const interval = setInterval(() => {
        if (queue.isEmpty()) {
          clearInterval(interval);
          setSuccessPopup(true);
        }
      }, 1000);
    }
  };

  const handleResetButtonClick = () => {
    setInputText("");
    setQueue(new Queue());
    setQueueDisplay("");
    setRightSideDisplay("");
    setSuccessPopup(false);
  };

  return (
    <div>
      <h1>React Assignment Header</h1>
      <div className="left-section">
        <div className="input-section">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="input-field"
          />
          <button onClick={handleAddButtonClick} className="btn-add">
            Add
          </button>
        </div>
        <div className="queue-display">
          <h3>Queue Display</h3>
          <p>{queueDisplay}</p>
        </div>
      </div>

      <div className="right-section">
        <h3>Pulled element Display</h3>
        <p>{rightSideDisplay}</p>

        <button onClick={handleEndButtonClick} className="btn-end">
          End
        </button>
        <button onClick={handleResetButtonClick} className="btn-reset">
          Reset
        </button>
      </div>
      {successPopup && <p>Success Popup</p>}
    </div>
  );
}

export default App;
