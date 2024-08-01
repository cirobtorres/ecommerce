import SquareLoaderStyles from "./SquareLoader.module.css";
import EllipsisLoaderStyles from "./EllipsisLoader.module.css";

export const SquareLoader = ({
  color,
  size,
}: {
  color?: string;
  size?: string;
}) => {
  return (
    <div
      className={`${SquareLoaderStyles["lds-grid"]} [&_div]:bg-[${color ? color : "#cbd5e1"}]`}
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export const EllipsisLoader = ({
  color,
  size,
}: {
  color?: string;
  size?: string;
}) => {
  return (
    <div className={EllipsisLoaderStyles["lds-ellipsis"]}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
