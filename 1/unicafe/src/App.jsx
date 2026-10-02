import { useState } from "react";

const Button = ({ onClick, children }) => {
  return (
    <button onClick={onClick} style={{ margin: "12px" }}>
      {children}
    </button>
  );
};

const Display = ({ count, children }) => {
  return (
    <p>
      {children}:{count}
    </p>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
  };
  const handleNeutral = () => {
    setNeutral(neutral + 1);
  };
  const handleBad = () => {
    setBad(bad + 1);
  };
  return (
    <>
      <h2>give feedback</h2>
      <Button onClick={handleGood}>good</Button>
      <Button onClick={handleNeutral}>neutral</Button>
      <Button onClick={handleBad}>bad</Button>
      <h2>statistics</h2>
      <Display count={good}>Good</Display>
      <Display count={neutral}>Neutral</Display>
      <Display count={bad}>Bad</Display>
    </>
  );
};

export default App;
