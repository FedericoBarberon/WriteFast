import classes from "./results.module.css";

export default function Results({ wpm, corrects, errors, stopGame }) {
  return (
    <div className="backdrop">
      <div className={classes.container}>
        <h2 className={classes.wpm}>{wpm} WPM</h2>
        <div className={classes.details}>
          <p>Palabras acertadas: {corrects}</p>
          <p>Palabras erradas: {errors}</p>
        </div>
        <button onClick={stopGame} className="button">
          Volver
        </button>
      </div>
    </div>
  );
}
