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
        className="bg-yellow-100 px-4 py-2 text-sm rounded-full w-28 sm:w-64 placeholder:text-stone-400 sm:focus:w-72 transition-all duration-300 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-opacity-50"
      />
    </form>
  );
}
