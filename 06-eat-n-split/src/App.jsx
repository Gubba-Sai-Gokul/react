import { useState } from "react";
import "./styles.css";

function App() {
  return <EatAndSplit />;
}

export default App;

function EatAndSplit() {
  const [friends, setFriends] = useState([
    {
      name: "Jay",
      image:
        "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=600&auto=format&fit=crop&q=60",
    },
    {
      name: "Vamshi",
      image:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=600&auto=format&fit=crop&q=60",
    },
  ]);

  const [isSplitBillDiv, SetISSplitBillDiv] = useState(false);
  const [currFriend, setCurrFriend] = useState(null);

  return (
    <div className="container">
      <div className="left">
        <Friend
          friends={friends}
          isSplitBillDiv={isSplitBillDiv}
          SetISSplitBillDiv={SetISSplitBillDiv}
          currFriend={currFriend}
          setCurrFriend={setCurrFriend}
        />
        <AddFriend setFriends={setFriends} />
      </div>

      <div className="right">
        {isSplitBillDiv && (
          <SplitBill key={currFriend?.name} currFriend={currFriend} setFriends={setFriends} />
        )}
      </div>
    </div>
  );
}

// function Friend({ friends, setCurrFriend, isSplitBillDiv, SetISSplitBillDiv }) {
//   return (
//     <>
//       {friends.map((f, index) => (
//         <div key={index} className="friend-card">
//           <div className="friend-info">
//             <div className="image">
//               <img src={f.image} alt={f.name} />
//             </div>
//             <div>
//               <p>{f.name}</p>

//               <p>
//                 {f.balance > 0
//                   ? `${f.name} owes you ${f.balance}`
//                   : f.balance < 0
//                   ? `You owe ${f.name} ${Math.abs(f.balance)}`
//                   : `You and ${f.name} are even`}
//               </p>
//             </div>
//           </div>

//           <button
//             onClick={() => {
//               SetISSplitBillDiv(true);
//               setCurrFriend(f);
//             }}
//           >
//             select
//           </button>
//         </div>
//       ))}
//     </>
//   );
// }

function Friend({ friends, setCurrFriend, currFriend, isSplitBillDiv, SetISSplitBillDiv }) {
  return (
    <>
      {friends.map((f, index) => {
        const isSelected = currFriend?.name === f.name;

        return (
          <div key={index} className="friend-card">
            <div className="friend-info">
              <div className="image">
                <img src={f.image} alt={f.name} />
              </div>

              <div>
                <p>{f.name}</p>
                <p>
                  {f.balance > 0
                    ? `${f.name} owes you ${f.balance}`
                    : f.balance < 0
                    ? `You owe ${f.name} ${Math.abs(f.balance)}`
                    : `You and ${f.name} are even`}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                if (isSelected && isSplitBillDiv) {
                  // Close the panel
                  setCurrFriend(null);
                  SetISSplitBillDiv(false);
                } else {
                  // Open with this friend
                  setCurrFriend(f);
                  SetISSplitBillDiv(true);
                }
              }}
            >
              {isSelected && isSplitBillDiv ? "Close" : "Select"}
            </button>
          </div>
        );
      })}
    </>
  );
}


function AddFriend({ setFriends }) {
  const [name, setName] = useState("");
  const [url, SetUrl] = useState("https://www.freepik.com/default-user");

  const [isOpen, setIsOpen] = useState(false);

  function handleSumbit(e) {
    e.preventDefault();
    setFriends((prev) => [...prev, { name, image: url }]);
  }

  return (
    <>
      {isOpen ? (
        <form onSubmit={handleSumbit} className="add-friend-form">
          <p>
            Friend name{" "}
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </p>

          <p>
            Image url{" "}
            <input value={url} onChange={(e) => SetUrl(e.target.value)} />
          </p>

          <button type="submit">Add</button>
          <button onClick={() => setIsOpen(false)} type="button">
            Close
          </button>
        </form>
      ) : (
        <button onClick={() => setIsOpen(true)}>Add friend</button>
      )}
    </>
  );
}

function SplitBill({ currFriend, setFriends }) {
  const [bill, setBill] = useState(null);
  const [yourExpense, setYourExpense] = useState(null);
  const [friendExpense, setFriendExpense] = useState(null);
  const [paidBy, setPaidBy] = useState("you");

  function handleSplit(e) {
    e.preventDefault();
    if (!bill || !yourExpense || !friendExpense) return;

    const amount =
      paidBy === "you"
        ? bill - yourExpense // friend owes you
        : -(bill - friendExpense); // you owe friend

    setFriends((prev) =>
      prev.map((item) =>
        item.name === currFriend.name ? { ...item, balance: amount } : item
      )
    );
  }

  return (
    <div className="split-bill">
      <h4>SPLIT A BILL WITH {currFriend?.name.toUpperCase()}</h4>
      <form onSubmit={handleSplit}>
        <p>
          <strong>Bill Value:</strong>{" "}
          <input type="number" onChange={(e) => setBill(e.target.value)} />
        </p>
        <p>
          <strong>Your Expense:</strong>{" "}
          <input
            type="number"
            onChange={(e) => setYourExpense(e.target.value)}
          />
        </p>
        <p>
          <strong>{`${currFriend?.name}'s`} Expense:</strong>{" "}
          <input
            type="number"
            onChange={(e) => setFriendExpense(e.target.value)}
          />
        </p>
        <div>
          <span>Who is paying the bill? </span>
          <select value={paidBy} onChange={(e) => setPaidBy(e.target.value)}>
            <option value={"you"}>You</option>
            <option value={"friend"}>{currFriend?.name}</option>
          </select>
        </div>
        <button type="submit">Split bill</button>
      </form>
    </div>
  );
}
