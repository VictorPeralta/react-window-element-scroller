import { useEffect, useCallback, RefObject } from "react";
import throttle from "lodash/throttle";
import {
  FixedSizeGrid,
  FixedSizeList,
  GridOnScrollProps,
  ListOnScrollProps,
  VariableSizeGrid,
  VariableSizeList,
} from "react-window";

type ReactWindowListTypes = FixedSizeList | VariableSizeList;
type ReactWindowGridTypes = FixedSizeGrid | VariableSizeGrid;

const windowScrollPositionKey = {
  y: "pageYOffset",
  x: "pageXOffset",
};

const documentScrollPositionKey = {
  y: "scrollTop",
  x: "scrollLeft",
};

type axis = "x" | "y";

const getWindowScrollPosition = (axis: axis) =>
  window[windowScrollPositionKey[axis]] ||
  document.documentElement[documentScrollPositionKey[axis]] ||
  document.body[documentScrollPositionKey[axis]] ||
  0;

const getElementScrollPosition = (element: HTMLElement, axis: axis) =>
  element[documentScrollPositionKey[axis]];

export type ListElementScrollerChildrenProps = {
  onScroll: (props: ListOnScrollProps) => any;
  style: React.CSSProperties;
};

export type GridElementScrollerChildrenProps = {
  onScroll: (props: GridOnScrollProps) => any;
  style: React.CSSProperties;
};

type CommonElementScrollerProps = {
  throttleTime?: number;
  outerRef: RefObject<HTMLDivElement>;
  childrenStyle?: React.CSSProperties;
  scrollerElementRef?: RefObject<HTMLElement>;
};

type ReactWindowListElementScrollerProps = CommonElementScrollerProps & {
  children: (props: ListElementScrollerChildrenProps) => any;
  type: "list";
  listRef: RefObject<ReactWindowListTypes>;
};

type ReactWindowGridElementScrollerProps = CommonElementScrollerProps & {
  children: (props: GridElementScrollerChildrenProps) => any;
  type: "grid";
  gridRef: RefObject<ReactWindowGridTypes>;
};

export type ReactWindowElementScrollerProps =
  | ReactWindowListElementScrollerProps
  | ReactWindowGridElementScrollerProps;

export const ReactWindowElementScroller = (
  props: ReactWindowElementScrollerProps
) => {
  const {
    children,
    throttleTime = 10,
    outerRef,
    type,
    childrenStyle,
    scrollerElementRef,
  } = props;

  const getScrollPosition = (axis: "x" | "y") =>
    scrollerElementRef?.current
      ? getElementScrollPosition(scrollerElementRef.current, axis)
      : getWindowScrollPosition(axis);

  useEffect(() => {
    const handleScroll = throttle(() => {
      const { offsetTop = 0, offsetLeft = 0 } = outerRef.current || {};
      const scrollTop = getScrollPosition("y") - offsetTop;
      const scrollLeft = getScrollPosition("x") - offsetLeft;
      if (type === "list")
        props.listRef.current && props.listRef.current.scrollTo(scrollTop);
      if (type === "grid")
        props.gridRef.current &&
          props.gridRef.current.scrollTo({ scrollLeft, scrollTop });
    }, throttleTime);

    const scrollElementOrWindow = scrollerElementRef?.current || window;

    scrollElementOrWindow.addEventListener("scroll", handleScroll);
    return () => {
      handleScroll.cancel();
      scrollElementOrWindow.removeEventListener("scroll", handleScroll);
    };
  }, [type]);

  const onScroll = useCallback(
    ({ scrollLeft, scrollTop, scrollOffset, scrollUpdateWasRequested }) => {
      if (!scrollUpdateWasRequested) return;
      const top = getScrollPosition("y");
      const left = getScrollPosition("x");
      const { offsetTop = 0, offsetLeft = 0 } = outerRef.current || {};

      scrollOffset += Math.min(top, offsetTop);
      scrollTop += Math.min(top, offsetTop);
      scrollLeft += Math.min(left, offsetLeft);
      const scrollElementOrWindow = scrollerElementRef?.current || window;
      console.log("before ifs", scrollOffset, scrollTop, top);

      if (type === "list" && scrollOffset !== top) {
        console.log("list onscroll", scrollOffset, top);
        scrollElementOrWindow.scrollTo(0, scrollOffset);
      }

      if (type === "grid" && (scrollTop !== top || scrollLeft !== left)) {
        scrollElementOrWindow.scrollTo(scrollLeft, scrollTop);
      }
    },
    [type]
  );

  const defaultStyle: React.CSSProperties = {
    width: type === "list" ? "100%" : "auto",
    height: "100%",
    display: "inline-block",
  };

  return children({
    style: { ...defaultStyle, ...childrenStyle },
    onScroll,
  });
};
