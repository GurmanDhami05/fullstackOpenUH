import { useState } from "react";

const Button = ({ onClick, children }) => {
  return (
    <button onClick={onClick} style={{ margin: "12px" }}>
      {children}
    </button>
  );
};

const TableRow = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad, total, avg, pos }) => {
  if (total === 0) {
    return <p>No feedback given</p>;
  }

  return (
    <table>
      <tbody>
        <TableRow value={good} text={"good"} />
        <TableRow value={neutral} text={"neutral"} />
        <TableRow value={bad} text={"bad"} />
        <TableRow value={total} text={"total"} />
        <TableRow value={avg} text={"average"} />
        <TableRow value={`${pos} %`} text={"Positive"} />
      </tbody>
    </table>
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
