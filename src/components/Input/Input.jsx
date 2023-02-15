import classes from "./input.module.css";

export default function Input({ buffer, writeStatus, handleChange }) {
  return (
    <input
      className={`${classes.input} ${classes[writeStatus] ?? ""}`}
      value={buffer}
      onChange={handleChange}
      autoFocus
      placeholder="Escribe la palabra y luego un espacio"
    />
  );
}
