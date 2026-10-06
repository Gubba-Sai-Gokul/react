import { useEffect, useState } from "react";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
    </div>
  );
}

function Logo() {
  return <h1>🏝️Far Away</h1>;
}

function Form() {
  const [input, setInput] = useState("");
  const [noOfItems, setNoOfItems] = useState(1);

  const [items, setItems] = useState([]);

  // console.log("Input value on change: ", input);

  function handleAddItem(e) {
    e.preventDefault();

    // Problem here is that react doesnt re-render when anything changes in it as items array reference dont change on mutation
    // items.push({
    //   noOfItems,
    //   input
    // });

    setItems((prev) => [
      ...prev,
      { noOfItems, input, checked: false, order: prev.length },
    ]);

    setInput("");
    setNoOfItems(1);

    // You cannot see state updates instantly as react state runs asynchronously and re-render doesnt happend yet
    // console.log("Items ", items);
  }

  // You can see after a re-render
  useEffect(() => {
    console.log("Items updated:", items);
  }, [items]);

  return (
    <div className="add-form">
      <h2>What do you need for your trip?</h2>
      <form onSubmit={handleAddItem}>
        <select
          value={noOfItems}
          onChange={(e) => setNoOfItems(() => Number(e.target.value))}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
        <input
          value={input}
          onInput={(e) => setInput(() => e.target.value)}
          name="itemInput"
        />
        <button>Add</button>
      </form>

      <PackagingList setItems={setItems} items={items} />
    </div>
  );
}

function PackagingList({ setItems, items }) {
  function handleRemoveItems(tripItem) {
    setItems((prev) => prev.filter((item) => item.input !== tripItem));
  }

  function handleToggleCheck(input) {
    setItems((prev) =>
      prev.map((item) =>
        item.input === input ? { ...item, checked: !item.checked } : item
      )
    );
  }

  function sort(option) {
    if (option === "sortByInputOrder") {
      setItems((prev) => {
        return [...prev].sort((a, b) => {
          return a.order - b.order;
        });
      });
      // setItems((prev) => [...prev].sort((a, b) => a.order - b.order));
    }

    if (option === "sortByName") {
      setItems((prev) =>
        [...prev].sort((a, b) => {
          const inputA = a.input.toUpperCase();
          const inputB = b.input.toUpperCase();
          return inputA.localeCompare(inputB);
        })
      );
    }
  }

  return (
    <>
      <div className="list">
        <h3>List of Items for a trip!</h3>

        {items.length > 0 ? (
          <>
            <select onChange={(e) => sort(e.target.value)}>
              <option value="sortByInputOrder">Sort by input order</option>
              <option value="sortByName">Sort by name</option>
            </select>
            <ul>
              {items?.map((item, index) => (
                <li
                  key={index}
                  className={`${item?.checked ? "checked" : "unChecked"}`}
                >
                  <input
                    type="checkbox"
                    checked={item?.checked}
                    onChange={() => handleToggleCheck(item.input)}
                  />
                  {item.noOfItems} — {item.input}
                  <button onClick={() => handleRemoveItems(item?.input)}>
                    X
                  </button>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p>
            <i>Planning for a trip? Add items!</i>
          </p>
        )}
      </div>

      <Stats items={items} />
    </>
  );
}

function Stats({ items }) {
  const total = items.length;
  const packed = items.filter((i) => i.checked).length;
  const percent = total > 0 ? Math.round((packed / total) * 100) : 0;

  return (
    <div>
      <em>
        You have {total} items, packed {packed} ({percent}%)
      </em>
    </div>
  );
}

export default App;
