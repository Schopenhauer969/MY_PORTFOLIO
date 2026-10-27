"use client";

import { useEffect, useState } from "react";

export function useTypewriter(text: string, speed = 40, startDelay = 0) {
  const [displayText, setDisplayText] = useState("");
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;

    const startTimer = setTimeout(() => {
      let currentLength = 0;

      interval = setInterval(() => {
        if (currentLength < text.length) {
          currentLength++;
          setDisplayText(text.slice(0, currentLength));
        } else {
          setIsDone(true);
          clearInterval(interval);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(startTimer);
      clearInterval(interval);
    };
  }, [text, speed, startDelay]);

  return { text: displayText, isDone };
}
