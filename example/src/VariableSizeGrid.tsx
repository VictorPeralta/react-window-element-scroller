import React, { useRef } from "react";
import { VariableSizeGrid as Grid } from "react-window";
import {
  GridElementScrollerChildrenProps,
  ReactWindowElementScroller,
} from "react-window-element-scroller";
import { Cell } from "./Cell";

const columnWidths = [...new Array(1000)].map(
  () => 75 + Math.round(Math.random() * 50)
);
const rowHeights = [...new Array(1000)].map(
  () => 25 + Math.round(Math.random() * 50)
);

const VariableSizeGrid = () => {
  const gridRef = useRef<Grid>(null);
  const outerRef = useRef<HTMLDivElement>(null);

  return (
    <ReactWindowElementScroller
      type="grid"
      gridRef={gridRef}
      outerRef={outerRef}
    >
      {({ style, onScroll }: GridElementScrollerChildrenProps) => (
        <Grid
          ref={gridRef}
          outerRef={outerRef}
          style={style}
          height={window.innerHeight}
          width={window.innerWidth}
          columnCount={1000}
          columnWidth={(index) => columnWidths[index]}
          rowCount={1000}
          rowHeight={(index) => rowHeights[index]}
          onScroll={onScroll}
        >
          {Cell}
        </Grid>
      )}
    </ReactWindowElementScroller>
  );
};

export default VariableSizeGrid;
