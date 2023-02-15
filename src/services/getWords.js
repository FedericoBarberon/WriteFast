const API_URL = 'https://api.generadordni.es/v2/text/words?words=300&language=es'

export const getWords = async () => {
  const data = await fetch(API_URL)
  const words = await data.json()

  return words[0].split(' ')
}