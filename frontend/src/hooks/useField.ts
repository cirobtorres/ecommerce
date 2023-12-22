import { useContext } from "react";
import FieldContext from "@/contexts/FieldContext";

const useField = () => useContext(FieldContext);

export default useField;
