import React, { useRef } from "react";
import { FixedSizeGrid as Grid } from "react-window";
import {
  GridElementScrollerChildrenProps,
  ReactWindowElementScroller,
} from "react-window-element-scroller";
import { Cell } from "./Cell";

const FixedSizeGrid = () => {
  const outerRef = useRef(null);
  const gridRef = useRef(null);

  return (
    <ReactWindowElementScroller
      type="grid"
      outerRef={outerRef}
      gridRef={gridRef}
    >
      {({ style, onScroll }: GridElementScrollerChildrenProps) => (
        <Grid
          ref={gridRef}
          outerRef={outerRef}
          style={style}
          height={window.innerHeight}
          width={window.innerWidth}
          columnCount={1000}
          columnWidth={100}
          rowCount={1000}
          rowHeight={50}
          onScroll={onScroll}
        >
          {Cell}
        </Grid>
      )}
    </ReactWindowElementScroller>
  );
};

export default FixedSizeGrid;
