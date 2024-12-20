import React, { useEffect, useRef, useState } from "react";

const useBounding = (nav = false) => {
  const pageRef = useRef(null);
  const [pageBounding, setPageBounding] = useState(null);
  const [left, setLeft] = useState(0);
  const [width, setWidth] = useState(0);

  const debounce = (fn, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn(...args), delay);
    };
  };

  const handleResize = debounce(() => {
    setPageBounding(pageRef.current?.getBoundingClientRect());
    setLeft(pageRef.current?.getBoundingClientRect()?.left);
    setWidth(pageRef.current?.getBoundingClientRect()?.width);
  }, 200);

  useEffect(() => {
    if (pageRef.current && nav) {
      setLeft(pageRef.current?.getBoundingClientRect()?.left + 10);
      setWidth(pageRef.current?.getBoundingClientRect()?.width - 20);
    } else if (pageRef.current) {
      setPageBounding(pageRef.current.getBoundingClientRect());
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  return {
    pageRef,
    pageBounding,
    left,
    width,
  };
};

export default useBounding;
