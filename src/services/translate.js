export async function translate (sourceLanguage, targetLanguage, text) {
  if (sourceLanguage === targetLanguage) {
    return {
      data: {
        translatedText: text
      },
      status: 'success'
    }
  }

  const url = process.env.URL_TRANSLATE

  const encodedParams = new URLSearchParams()
  encodedParams.append('source_language', sourceLanguage)
  encodedParams.append('target_language', targetLanguage)
  encodedParams.append('text', text)

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': process.env.TRANSLATE_API_KEY,
      'X-RapidAPI-Host': process.env.TRANSLATE_HOST
    },
    body: encodedParams
  }
  const response = await fetch(url, options)
  return await response.json()
}

export async function detectLanguage (text) {
  const url = process.env.URL_DETECT_LANGUAGE
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + process.env.DETECT_LANGUAGE_API_KEY
    },
    body: JSON.stringify({ texts: [text] })
  }

  const response = await fetch(url, options)
  return await response.json()
}
