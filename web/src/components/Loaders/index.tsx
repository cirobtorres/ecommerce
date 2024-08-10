import Styles from "./Styles.module.css";

const Loader = ({ size = 48 }: { size?: number }) => {
  return (
    <span
      className={Styles["loader"]}
      style={{ width: `${size}px`, height: `${size}px` }}
    />
  );
};

export default Loader;
