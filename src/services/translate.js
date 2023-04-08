const URL_TRANSLATE = 'https://text-translator2.p.rapidapi.com/translate'
const TRANSLATE_API_KEY = '08ef54e6b7mshddccb9c5554a2b6p16978fjsnec8ec41bdf7c'
const TRANSLATE_HOST = 'text-translator2.p.rapidapi.com'

const URL_DETECT_LANGUAGE = 'https://api.cohere.ai/v1/detect-language'
const DETECT_LANGUAGE_API_KEY = 'OgiuAEB9beITypoDvtMJkqVF0RvJx76yYTJGsuBB'

export async function translate (sourceLanguage, targetLanguage, text) {
  if (sourceLanguage === targetLanguage) {
    return {
      data: {
        translatedText: text
      },
      status: 'success'
    }
  }

  const url = URL_TRANSLATE

  const encodedParams = new URLSearchParams()
  encodedParams.append('source_language', sourceLanguage)
  encodedParams.append('target_language', targetLanguage)
  encodedParams.append('text', text)

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': TRANSLATE_API_KEY,
      'X-RapidAPI-Host': TRANSLATE_HOST
    },
    body: encodedParams
  }
  const response = await fetch(url, options)
  return await response.json()
}

export async function detectLanguage (text) {
  const url = URL_DETECT_LANGUAGE
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + DETECT_LANGUAGE_API_KEY
    },
    body: JSON.stringify({ texts: [text] })
  }

  const response = await fetch(url, options)
  return await response.json()
}
