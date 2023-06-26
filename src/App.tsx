import { useState } from "react";
export const App = () => {
  const [number, setNumber] = useState(1);
  function handleClick() {
    setNumber(number + 1);
  }
  return (
    <div id="app" onClick={handleClick}>
      this {number}
    </div>
  );
};
