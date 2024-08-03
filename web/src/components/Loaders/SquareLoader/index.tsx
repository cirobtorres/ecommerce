import Styles from "./Styles.module.css";

export const SquareLoader = ({ color }: { color?: string }) => {
  return (
    <div className={Styles["lds-grid"]}>
      <div style={{ background: color ? color : "#cbd5e1" }}></div>
      <div style={{ background: color ? color : "#cbd5e1" }}></div>
      <div style={{ background: color ? color : "#cbd5e1" }}></div>
      <div style={{ background: color ? color : "#cbd5e1" }}></div>
      <div style={{ background: color ? color : "#cbd5e1" }}></div>
      <div style={{ background: color ? color : "#cbd5e1" }}></div>
      <div style={{ background: color ? color : "#cbd5e1" }}></div>
      <div style={{ background: color ? color : "#cbd5e1" }}></div>
      <div style={{ background: color ? color : "#cbd5e1" }}></div>
    </div>
  );
};
