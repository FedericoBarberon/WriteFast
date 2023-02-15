import { useEffect } from "react";
import { useState } from "react";
import classes from "./app.module.css";
import Loading from "./components/Loading/Loading";
import Results from "./components/Results/Results";
import { getWords } from "./services/getWords";

const timesOptions = [30, 60, 120];

export default function App() {
  const [started, setStarted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [buffer, setBuffer] = useState("");
  const [words, setWords] = useState([]);
  const [writeStatus, setWriteStatus] = useState();
  const [errors, setErrors] = useState(0);
  const [corrects, setCorrects] = useState(0);
  const [initialTime, setInitialTime] = useState(60);
  const [time, setTime] = useState(initialTime);

  const startGame = async () => {
    setLoading(true);
    const fetchedWords = await getWords();
    setLoading(false);

    setTime(initialTime);
    setWords(fetchedWords);
    setStarted(true);
  };

  const resetGame = () => {
    setStarted(false);
    setShowResults(false);
    setBuffer("");
    setWriteStatus();
    setErrors(0);
    setCorrects(0);
    setTime(initialTime);
  };

  const handleChange = (event) => {
    if (event.target.value === " ") return;
    setBuffer(event.target.value);
  };

  useEffect(() => {
    if (!started) return;

    if (time > 0) {
      const interval = setInterval(() => {
        setTime(time - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setStarted(false);
      setShowResults(true);
    }
  }, [started, time]);

  useEffect(() => {
    if (buffer.at(-1) === " ") {
      if (words[0] === buffer.slice(0, -1)) {
        setWriteStatus("success");
        setCorrects(corrects + 1);
      } else {
        setWriteStatus("error");
        setErrors(errors + 1);
      }

      setBuffer("");
      setWords((words) => words.slice(1));
    }
  }, [buffer]);

  return (
    <main className={classes.container}>
      <h1 className={classes.title}>⚡WriteFast</h1>
      <p className={classes.subtitle}>¿Qué tan rápido escribes?</p>

      {loading && <Loading />}

      {started ? (
        <>
          <div className={classes.wordsVisor}>
            {words.map((word, index) => (
              <span
                key={index}
                className={`${classes.word} ${
                  index === 0 ? classes.actual : ""
                }`}
              >
                {word}
              </span>
            ))}
          </div>
          <div className={classes.inputContainer}>
            <input
              className={`${classes.input} ${classes[writeStatus] ?? ""}`}
              value={buffer}
              onChange={handleChange}
              autoFocus
              placeholder="Escribe la palabra y luego un espacio"
            />
            <span className={classes.time}>{time}s</span>
            <button className="button" onClick={resetGame}>
              Stop
            </button>
          </div>
        </>
      ) : (
        <>
          <div className={classes.timeSelect}>
            <span>Tiempo</span>
            <select
              value={initialTime}
              onChange={(e) => setInitialTime(e.target.value)}
              defaultValue={initialTime}
            >
              {timesOptions.map((time) => (
                <option key={time} value={time}>
                  {time}s
                </option>
              ))}
            </select>
          </div>
          <button className="button" onClick={startGame}>
            Empezar
          </button>
        </>
      )}

      {showResults && (
        <Results
          wpm={(60 / initialTime) * corrects}
          corrects={corrects}
          errors={errors}
          stopGame={resetGame}
        />
      )}
    </main>
  );
}
