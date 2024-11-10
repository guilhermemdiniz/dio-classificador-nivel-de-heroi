import styled from "styled-components";
import "./index.css";

export default function XpIndicator({ xp, level }) {
  return (
    <div className={"indicator-container"}>
      <XpBar $xp={xp} $level={level}>
        <div className="xp-fill"></div>
      </XpBar>
    </div>
  );
}

const XpBar = styled.div`
  //FILL INTERVAL [0%, 100%]
  height: ${({ $xp, $level }) => `${calcXpFill($xp, $level)}%`};
  width: 100%;
  border-radius: 2px;
  position: relative;
  overflow: hidden;

  @media screen and (max-width: 768px) {
    height: 100%;
    width: ${({ $xp, $level }) => `${calcXpFill($xp, $level)}%`};
  }
`;

function calcXpFill(xp, level) {
  //How to calculate the Xp fill on XP Bar
  /* level  |   Xp Interval      |    Expression
   *--------------------------------------------------
   *   l0    |    [0 - 1000]      |    xp/10
   *   l1    |    [1001 - 2000]   |    (xp - 1000)/10
   *   l2    |    [2001 - 5000]   |    (xp - 2000)/30
   *   l3    |    [5001 - 7000]   |    (xp - 5000)/20
   *   l4    |    [7001 - 8000]   |    (xp - 7000)/10
   *   l5    |    [8001 - 9000]   |    (xp - 8000)/10
   *   l6    |    [9001 - 10000]  |    (xp - 9000)/10
   *   l7+   |    [>= 10001]      |    100
   *
   * Note: this expression calculates the fill percentage of th XP Bar based on the current
   * XP and the corresponding level range
   */
  switch(level) {
    case 0:
      return xp/10;
    case 1:
      return (xp - 1000)/10;
    case 2:
      return (xp - 2000)/30;
    case 3:
      return (xp - 5000)/20;
    case 4:
      return (xp - 7000)/10;
    case 5:
      return (xp - 8000)/10;
    case 6:
      return (xp - 9000)/10;
    case 7:
      return 100;
    default:
      return 0;
  }
}
