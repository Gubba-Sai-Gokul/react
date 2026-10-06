import { useEffect } from "react";

export default function useKey(pressedKey, func) {
  useEffect(() => {
    const callBack = (e) => {
      if (e.code === pressedKey) {
        func?.()
        console.log("CLOSING");
      }
    };

    document.addEventListener("keydown", callBack);

    return function () {
      document.removeEventListener("keydown", callBack);
    };
  }, [func, pressedKey]);
}
