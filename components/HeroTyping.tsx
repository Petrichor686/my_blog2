'use client';

import { useState, useEffect } from 'react';

const FULL_TEXT = '一个搞嵌入式也写代码的工科生';

export default function HeroTyping() {
  const [text, setText] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setText(FULL_TEXT.slice(0, i));
      if (i >= FULL_TEXT.length) {
        clearInterval(timer);
        setDone(true);
      }
    }, 80);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <h1
        style={{
          fontSize: 'clamp(2rem, 5vw, 3.2rem)',
          fontWeight: 700,
          lineHeight: 1.25,
          marginBottom: '10px',
          letterSpacing: '-0.01em',
        }}
      >
        {text.slice(0, 6)}
      </h1>
      <h1
        style={{
          fontSize: 'clamp(2rem, 5vw, 3.2rem)',
          fontWeight: 700,
          lineHeight: 1.25,
          marginBottom: '24px',
          letterSpacing: '-0.01em',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
        }}
      >
        <span style={{ color: 'var(--accent-amber)' }}>{text.slice(6)}</span>
        <span
          style={{
            display: 'inline-block',
            width: '10px',
            height: '1.2em',
            background: done ? 'var(--accent-green)' : 'transparent',
            animation: done ? 'blink 1s step-end infinite' : 'none',
            verticalAlign: 'middle',
            marginLeft: '2px',
          }}
        />
      </h1>
    </>
  );
}
