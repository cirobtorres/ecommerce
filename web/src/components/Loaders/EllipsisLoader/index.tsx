import Styles from "./Styles.module.css";

const EllipsisLoader = ({ color, size }: { color?: string; size?: string }) => {
  return (
    <div className={Styles["lds-ellipsis"]}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default EllipsisLoader;
