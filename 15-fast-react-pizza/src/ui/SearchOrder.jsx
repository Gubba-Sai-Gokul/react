import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchOrder() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleInput = (v) => {
    setInput(v);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!input) return;
    navigate(`/order/${input}`);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder={"search order #"}
        value={input}
        onChange={(e) => handleInput(e.target.value)}
      />
    </form>
  );
}
