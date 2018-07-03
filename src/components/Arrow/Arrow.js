import React from 'react'

const Arrow = ({ color, direction = 'left', ...props }) => (
  <svg
    width={26.81}
    height={15.754}
    viewBox="0 0 25.134 14.769"
    transform={`rotate(${direction === 'left' ? 0 : 180})`}
    fill={color}
    {...props}
  >
    <path
      style={{
        lineHeight: "normal",
        textIndent: 0,
        textAlign: "start",
        textDecorationLine: "none",
        textDecorationStyle: "solid",
        textTransform: "none",
        blockProgression: "tb",
        isolation: "auto",
        mixBlendMode: "normal"
      }}
      d="M8.214 0a.735.735 0 0 0-.518.192L.27 6.746a.735.735 0 0 0-.262.668.735.735 0 0 0 .015.17.735.735 0 0 0 .002.008.735.735 0 0 0 .014.053.735.735 0 0 0 .23.367l7.428 6.553a.735.735 0 1 0 .973-1.102L2.663 8.164H24.36a.735.735 0 1 0 0-1.468H2.548l6.12-5.403A.735.735 0 0 0 8.215 0z"
      fontWeight={400}
      fontFamily="sans-serif"
      overflow="visible"
      fillRule="evenodd"
    />
  </svg>
)

export default Arrow
