import { useState } from "react";

function App() {
  const [bill, setBill] = useState(0);
  const [tip1, setTip1] = useState(0);
  const [tip2, setTip2] = useState(0);

  return (
    <>
      <Bill bill={bill} handleSetBill={(value) => setBill(Number(value))} />

      <ServiceTip
        text={"How did you like the service? "}
        tip={tip1}
        handleSetTip={setTip1}
      />

      <ServiceTip
        text={"How did your friend like the service? "}
        tip={tip2}
        handleSetTip={setTip2}
      />

      {bill > 0 && (
        <AmountToBePaid tip1={tip1} tip2={tip2} bill={bill} />
      )}
    </>
  );
}

export default App;

function Bill({ handleSetBill }) {
  return (
    <p>
      <strong>How much was the bill? </strong>
      <input type="number" onChange={(e) => handleSetBill(e.target.value)} />
    </p>
  );
}

function ServiceTip({ text, handleSetTip }) {
  return (
    <>
      <p>
        <strong>{text}</strong>
        <select onChange={(e) => handleSetTip(Number(e.target.value))}>
          <option value="0">Dissatisfied (0%)</option>
          <option value="5">It was okay (5%)</option>
          <option value="10">It was good (10%)</option>
          <option value="20">Absolutely amazing (20%)</option>
        </select>
      </p>
    </>
  );
}

function AmountToBePaid({tip1, tip2, bill}) {
  const totalTipPercentage = Number(tip1) + Number(tip2);
  const avgTipPercentage = totalTipPercentage / 2;
  const tip = (bill * avgTipPercentage) / 100;
  const totalBill = Math.round(bill + tip);

  return <h2>{`You pay: ${totalBill} (${bill} + ${tip})`}</h2>;
}