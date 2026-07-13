'use client';

import { useEffect, useRef } from 'react';

const WORDS = [
  '富强', '民主', '文明', '和谐',
  '自由', '平等', '公正', '法治',
  '爱国', '敬业', '诚信', '友善',
];

const COLORS = [
  '#ef4444', // 富强 - 红
  '#f97316', // 民主 - 橙
  '#eab308', // 文明 - 黄
  '#4ade80', // 和谐 - 绿
  '#22d3ee', // 自由 - 青
  '#3b82f6', // 平等 - 蓝
  '#a855f7', // 公正 - 紫
  '#ec4899', // 法治 - 粉
  '#f43f5e', // 爱国 - 玫红
  '#14b8a6', // 敬业 - 碧绿
  '#8b5cf6', // 诚信 - 蓝紫
  '#06b6d4', // 友善 - 亮青
];

export default function ClickBubble() {
  const indexRef = useRef(0);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const word = WORDS[indexRef.current];
      const color = COLORS[indexRef.current];
      indexRef.current = (indexRef.current + 1) % WORDS.length;

      const span = document.createElement('span');
      span.textContent = word;
      span.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        font-family: 'JetBrains Mono', 'PingFang SC', monospace;
        font-size: 0.88rem;
        font-weight: 600;
        color: ${color};
        pointer-events: none;
        z-index: 9999;
        white-space: nowrap;
        text-shadow: 0 0 6px ${color}44;
        animation: bubble-float 1.5s ease-out forwards;
      `;

      document.body.appendChild(span);

      span.addEventListener('animationend', () => {
        span.remove();
      });
    };

    // Inject keyframes once
    if (!document.getElementById('bubble-keyframes')) {
      const style = document.createElement('style');
      style.id = 'bubble-keyframes';
      style.textContent = `
        @keyframes bubble-float {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) translateY(0);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) translateY(-50px);
          }
        }
      `;
      document.head.appendChild(style);
    }

    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  return null;
}
