import styles from "./index.module.scss";
import classNames from "classnames";

const Dot = ({ width = 10, className = "", style = {} }) => {
  const dotClass = classNames(styles.dot, className);
  return <span className={dotClass} style={{ ...style, width }}></span>;
};

const Icons = () => {
  return <div>icons</div>;
};

export const Screen = ({ children }: any) => {
  return (
    <div className={styles.screen}>
      <div className={styles.headerLine}>
        {Array(10)
          .fill("0")
          .map((_, index) => {
            const currentIndex = index + 1;
            const floatType = currentIndex >= 6 ? "right" : "left";
            const currentWidth = currentIndex % 5 === 1 ? 40 : 10;
            let currentStyle = {};
            if (floatType === "left" && currentWidth === 10) {
              currentStyle = { marginLeft: "10px" };
            } else if (floatType === "right" && currentWidth === 10) {
              currentStyle = { marginRight: "10px" };
            }
            return (
              <Dot
                key={index}
                width={currentWidth}
                className={
                  floatType === "left" ? styles.floatLeft : styles.floatRight
                }
                style={currentStyle}
              ></Dot>
            );
          })}
      </div>
      <div className={styles.leftIcons}>
        <Icons />
      </div>
      <div className={styles.rightIcons}>
        <Icons />
      </div>
      <div className={styles.header}>俄罗斯方块</div>
      <div className={styles.screenContainer}>{children}</div>
    </div>
  );
};
