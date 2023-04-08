import { IconoDobleFlecha } from './components/Icons.jsx'
import './App.css'
import { useEffect } from 'react'
import { Textarea } from './components/Textarea.jsx'
import { SelectLanguage } from './components/SelectLanguage.jsx'
import { ModalAllLanguages } from './components/ModalAllLanguages.jsx'
import { useDebounce } from './hooks/useDebounce.jsx'
import { detectLanguage, translate } from './services/translate.js'
import { useStore } from './hooks/useStore.js'

function App () {
  const {
    show,
    type,
    from,
    fromCode,
    to,
    toCode,
    auto,
    speaking,
    loading,
    idiomaDetectado,
    text,
    result,
    setSpeaking,
    setFromText,
    deleteFromText,
    setFromLanguageSelected,
    setToLanguageSelected,
    closeSearchLanguage,
    interchangeLanguages,
    setLanguageDetected,
    resultTranslate
  } = useStore()
  const debounceValue = useDebounce(text)

  useEffect(() => {
    if (debounceValue.trim() === '' || text.trim() === '') return

    const languageDetected = async () => {
      const value = await detectLanguage(debounceValue)
      const result = value.results[0]
      const payload = {
        from: result.language_name,
        fromCode: result.language_code,
        idiomaDetectado: true
      }
      setLanguageDetected(payload)
    }

    const translateText = async () => {
      const translatedText = await translate(fromCode, toCode, debounceValue)

      if (translatedText.status !== 'success') {
        resultTranslate({ result: 'Error' })
        return
      }

      if (translatedText.data.translatedText !== '') {
        resultTranslate({ result: translatedText.data.translatedText })
      }
    }

    if (auto) {
      languageDetected()
    }

    if (fromCode !== 'auto') {
      translateText()
    }
  }, [debounceValue, from, to])

  const handleText = (e) => {
    const { value } = e.target
    setFromText({ text: value })
  }

  const deleteText = () => {
    deleteFromText()
  }

  // Estilar el micrófono cuando se inicie la captura de audio
  const speech = () => {
    // eslint-disable-next-line new-cap, no-undef
    const recognition = new webkitSpeechRecognition()
    recognition.lang = 'es-CO'

    recognition.onsoundend = (e) => {
      recognition.stop()
    }

    recognition.onerror = (e) => {
      setSpeaking({ speaking: false })
    }

    recognition.onresult = (e) => {
      const textSpeech = e.results[0][0].transcript
      setFromText({ text: textSpeech })
    }

    recognition.start()
    setSpeaking({ speaking: true })
  }

  const handleLanguageSelected = (language, code, type, isAuto) => {
    if (type === 'from') {
      setFromLanguageSelected({
        from: language,
        fromCode: code,
        idiomaDetectado: false,
        isAuto
      })
      return
    }

    setToLanguageSelected({
      to: language,
      toCode: code,
      isAuto
    })
  }

  const handleCloseSearchLanguage = (e, showSearch, type) => {
    e.preventDefault()
    closeSearchLanguage({ showSearch, type })
  }

  const handleChangeLanguages = () => {
    interchangeLanguages()
  }

  return (
    <main>
      <h1 className='text-2xl'>Traductor de Google</h1>
      <div className='flex flex-col gap-2 w-full'>
        <section className='grid grid-cols-[1fr_3em_1fr] relative'>
          {
            show &&
              <ModalAllLanguages
                handleCloseSearchLanguage={handleCloseSearchLanguage}
                type={type}
                handleLanguageSelected={handleLanguageSelected}
              />
          }
          <SelectLanguage
            handleCloseSearchLanguage={handleCloseSearchLanguage}
            selectedLanguage={from}
            idiomaDetectado={idiomaDetectado}
            type='from'
          />
          <div className='flex justify-center items-center fill-[#5f6368]'>
            <button
              disabled={from.toLowerCase() === 'detectar idioma'}
              onClick={handleChangeLanguages}
              className='containerIcon'
            >
              <IconoDobleFlecha />
            </button>
          </div>
          <SelectLanguage
            handleCloseSearchLanguage={handleCloseSearchLanguage}
            selectedLanguage={to}
            type='to'
          />
        </section>
        <section className='grid grid-cols-1 gap-2 sm:grid-cols-[1fr_3em_1fr] sm:gap-0'>
          <Textarea
            placeholder='Ingresar texto'
            disabled={false}
            type='from'
            handleText={handleText}
            text={text}
            deleteText={deleteText}
            speech={speech}
            speaking={speaking}
          />
          <div />
          <Textarea
            placeholder='Traducción'
            disabled
            type='to'
            handleText={handleText}
            text={result}
            deleteText={deleteText}
            speech={speech}
            speaking={speaking}
            loading={loading}
          />
        </section>
      </div>
    </main>
  )
}

export default App
