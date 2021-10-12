import React, { useRef } from "react";
import { FixedSizeList as List } from "react-window";
import {
  ListElementScrollerChildrenProps,
  ReactWindowElementScroller,
} from "react-window-element-scroller";
import { ListWithMode } from "./App";
import { Row } from "./Row";

const FixedSizeList = ({ mode }: ListWithMode) => {
  const outerRef = useRef(null);
  const listRef = useRef(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  console.log("ref", scrollerRef);

  return (
    <>
      {mode === "window" && (
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
              itemSize={100}
              onScroll={onScroll}
            >
              {Row}
            </List>
          )}
        </ReactWindowElementScroller>
      )}
      {mode === "element" && (
        <div>
          <div
            ref={scrollerRef}
            style={{
              height: "300px",
              overflowY: "auto",
              position: "relative",
            }}
          >
            <p>This is some content</p>
            <p>This is some content</p>
            <p>This is some content</p>
            <ReactWindowElementScroller
              type="list"
              outerRef={outerRef}
              listRef={listRef}
              scrollerElementRef={scrollerRef}
              childrenStyle={{ height: "fit-content" }}
            >
              {({ style, onScroll }: ListElementScrollerChildrenProps) => (
                <List
                  ref={listRef}
                  outerRef={outerRef}
                  style={style}
                  height={window.innerHeight}
                  width={window.innerWidth}
                  itemCount={1000}
                  itemSize={100}
                  onScroll={onScroll}
                >
                  {Row}
                </List>
              )}
            </ReactWindowElementScroller>
          </div>
        </div>
      )}
    </>
  );
};

export default FixedSizeList;
