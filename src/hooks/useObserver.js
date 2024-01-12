import { useState, useEffect, useRef } from 'react';

const useObserver = (options) => {
  const objRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const onEntry = (entries) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  }
  useEffect(
    () => {
      const observer = new IntersectionObserver(onEntry, options);
      if (objRef.current) observer.observe(objRef.current)
      return () => {
        if (objRef.current) observer.unobserve(objRef.current)
      }
    }, [objRef, options]
  );

  return [objRef, isVisible];
};

export default useObserver;