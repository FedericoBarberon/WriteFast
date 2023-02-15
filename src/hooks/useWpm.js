import { useEffect, useState } from 'react'
import { getWords } from '../services/getWords'

export const useWpm = () => {
  const [started, setStarted] = useState(false)
  const [time, setTime] = useState()
  const [showResults, setShowResults] = useState(false)
  const [loading, setLoading] = useState(false)
  const [buffer, setBuffer] = useState('')
  const [words, setWords] = useState([])
  const [writeStatus, setWriteStatus] = useState()
  const [corrects, setCorrects] = useState(0)
  const [errors, setErrors] = useState(0)

  const startGame = async (initialTime) => {
    setLoading(true)
    const fetchedWords = await getWords()
    setLoading(false)

    setTime(initialTime)
    setWords(fetchedWords)
    setStarted(true)
  }

  const resetGame = () => {
    setStarted(false)
    setBuffer('')
    setWriteStatus()
    setErrors(0)
    setCorrects(0)
    setShowResults(false)
  }

  const updateBuffer = (event) => {
    if (event.target.value === ' ') return
    setBuffer(event.target.value)
  }

  // useEffect para el timer
  useEffect(() => {
    if (!started) return

    if (time > 0) {
      const interval = setInterval(() => {
        setTime(time - 1)
      }, 1000)

      return () => clearInterval(interval)
    } else {
      setStarted(false)
      setShowResults(true)
    }
  }, [started, time])

  // useEffect para chequear y cambiar la palabra
  useEffect(() => {
    if (buffer.at(-1) !== ' ') return

    if (words[0] === buffer.slice(0, -1)) {
      setWriteStatus('success')
      setCorrects(corrects + 1)
    } else {
      setWriteStatus('error')
      setErrors(errors + 1)
    }

    setBuffer('')
    setWords((words) => words.slice(1))
  }, [buffer])

  return {
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
  }
}
