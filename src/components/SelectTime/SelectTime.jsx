import classes from "./selectTime.module.css";

const timesOptions = [30, 60, 120];

export default function SelectTime({ initialTime, handleChange }) {
  return (
    <div className={classes.timeSelect}>
      <span>Tiempo</span>
      <select
        value={initialTime}
        onChange={handleChange}
        defaultValue={initialTime}
      >
        {timesOptions.map((time) => (
          <option key={time} value={time}>
            {time}s
          </option>
        ))}
      </select>
    </div>
  );
}
