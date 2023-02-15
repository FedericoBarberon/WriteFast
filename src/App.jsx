import { useState } from 'react'
import { useWpm } from './hooks/useWpm'
import classes from './app.module.css'
import Input from './components/Input/Input'
import Loading from './components/Loading/Loading'
import Results from './components/Results/Results'
import SelectTime from './components/SelectTime/SelectTime'
import WordsVisor from './components/WordsVisor/WordsVisor'

export default function App () {
  const [initialTime, setInitialTime] = useState(60)
  const {
    started,
    startGame,
    resetGame,
    time,
    buffer,
    updateBuffer,
    words,
    writeStatus,
    corrects,
    errors,
    loading,
    showResults
  } = useWpm()

  return (
    <main className={classes.container}>
      <h1 className={classes.title}>⚡WriteFast</h1>
      <p className={classes.subtitle}>¿Qué tan rápido escribes?</p>

      {loading && <Loading />}

      {started
        ? (
          <>
            <WordsVisor words={words} />
            <div className={classes.row}>
              <Input
                buffer={buffer}
                handleChange={updateBuffer}
                writeStatus={writeStatus}
              />
              <span className={classes.time}>{time}s</span>
              <button className='button' onClick={resetGame}>
                Stop
              </button>
            </div>
          </>
          )
        : (
          <>
            <SelectTime
              initialTime={initialTime}
              handleChange={(e) => setInitialTime(e.target.value)}
            />
            <button className='button' onClick={() => startGame(initialTime)}>
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
  )
}
