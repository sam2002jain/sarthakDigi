import * as React from "react";
import Svg, { Path } from "react-native-svg";

const ModernSparkleStar = (props) => (
  <Svg
    width={150}
    height={150}
    viewBox="-5 -5 110 110" // Adjusted viewBox for padding
    {...props}
  >
    {/* This is the main star shape. It's a single path with two parts:
      1. The first part (starting with M 50 0) draws the outer boundary.
      2. The second part (starting with M 50 22) draws the inner boundary, creating the hollow effect.
      The 'Q' commands create the smooth, curved "pinched" sides.
    */}
    <Path
      d="M50 0 Q 60 40 100 50 Q 60 60 50 100 Q 40 60 0 50 Q 40 40 50 0 Z M50 22 Q 45 45 28 50 Q 45 55 50 78 Q 55 55 72 50 Q 55 45 50 22 Z"
      fill="#C8B6FF"
    />
    {/* These are the two smaller sparkles. They are simple 4-pointed stars.
    */}
    <Path
      d="M88 15 L 90 20 L 95 22 L 90 25 L 88 30 L 86 25 L 81 22 L 86 20 Z"
      fill="#C8B6FF"
    />
    <Path
      d="M15 75 L 17 80 L 22 82 L 17 85 L 15 90 L 13 85 L 8 82 L 13 80 Z"
      fill="#C8B6FF"
    />
  </Svg>
);

export default ModernSparkleStar;