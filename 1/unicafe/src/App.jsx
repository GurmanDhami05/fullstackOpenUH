import { useState } from "react";

const Button = ({ onClick, children }) => {
  return (
    <button onClick={onClick} style={{ margin: "12px" }}>
      {children}
    </button>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <p>
      {text}:{value}
    </p>
  );
};

const Statistics = ({ good, neutral, bad, total, avg, pos }) => {
  if (total === 0) {
    return <p>No feedback given</p>;
  }

  return (
    <>
      <StatisticLine value={good} text={"good"} />
      <StatisticLine value={neutral} text={"neutral"} />
      <StatisticLine value={bad} text={"bad"} />
      <StatisticLine value={total} text={"total"} />
      <StatisticLine value={avg} text={"average"} />
      <StatisticLine value={`${pos} %`} text={"Positive"} />
    </>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const total = good + neutral + bad;
  const avg = total === 0 ? 0 : (good - bad) / total;
  const pos = total === 0 ? 0 : (good / total) * 100;

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
      <Statistics
        good={good}
        bad={bad}
        neutral={neutral}
        total={total}
        avg={avg}
        pos={pos}
      />
    </>
  );
};

export default App;
