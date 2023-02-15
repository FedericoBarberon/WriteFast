import classes from "./wordsVisor.module.css";

export default function WordsVisor({ words }) {
  return (
    <div className={classes.wordsVisor}>
      {words.map((word, index) => (
        <span
          key={index}
          className={`${classes.word} ${index === 0 ? classes.actual : ""}`}
        >
          {word}
        </span>
      ))}
    </div>
  );
}
