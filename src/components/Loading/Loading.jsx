import classes from "./loading.module.css";

export default function Loading() {
  return (
    <div className="backdrop">
      <span className={classes.spinner}></span>
    </div>
  );
}
