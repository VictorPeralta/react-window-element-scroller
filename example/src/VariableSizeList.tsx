import React, { useRef } from "react";
import { VariableSizeList as List } from "react-window";
import {
  ListElementScrollerChildrenProps,
  ReactWindowElementScroller,
} from "react-window-element-scroller";
import { Row } from "./Row";

const rowSizes = [...new Array(1000)].map(
  () => 25 + Math.round(Math.random() * 50)
);
const getItemSize = (index: number) => rowSizes[index];

const VariableSizeList = () => {
  const listRef = useRef<List>(null);
  const outerRef = useRef<HTMLDivElement>(null);

  return (
    <ReactWindowElementScroller
      type="list"
      outerRef={outerRef}
      listRef={listRef}
    >
      {({ style, onScroll }: ListElementScrollerChildrenProps) => (
        <List
          ref={listRef}
          outerRef={outerRef}
          style={style}
          height={window.innerHeight}
          width={window.innerWidth}
          itemCount={1000}
          itemSize={getItemSize}
          onScroll={onScroll}
        >
          {Row}
        </List>
      )}
    </ReactWindowElementScroller>
  );
};

export default VariableSizeList;
