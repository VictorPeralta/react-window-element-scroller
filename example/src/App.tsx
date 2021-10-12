import React, { useState } from "react";
import FixedSizeList from "./FixedSizeList";
import VariableSizeList from "./VariableSizeList";
import FixedSizeGrid from "./FixedSizeGrid";
import VariableSizeGrid from "./VariableSizeGrid";

const lists = ["Fixed List", "Variable List", "Fixed Grid", "Variable Grid"];

export interface ListWithMode {
  mode: "window" | "element";
}

const App = () => {
  const [selected, setSelected] = useState(lists[0]);
  const [mode, setMode] = useState<"window" | "element">("window");
  return (
    <>
      <nav>
        {lists.map((list) => (
          <button key={list} onClick={() => setSelected(list)}>
            {list}
          </button>
        ))}
        {
          <>
            <label>
              <input
                type="radio"
                checked={mode === "window"}
                onChange={() => setMode("window")}
              />
              Window
            </label>
            <label>
              <input
                type="radio"
                checked={mode === "element"}
                onChange={() => setMode("element")}
              />
              Element
            </label>
          </>
        }
      </nav>

      {selected === "Fixed List" && <FixedSizeList mode={mode} />}
      {selected === "Variable List" && <VariableSizeList />}
      {selected === "Fixed Grid" && <FixedSizeGrid />}
      {selected === "Variable Grid" && <VariableSizeGrid />}
    </>
  );
};

export default App;
