import { IconoDobleFlecha } from './components/Icons.jsx'
import { useEffect, useRef } from 'react'
import { Textarea } from './components/Textarea.jsx'
import { SelectLanguage } from './components/SelectLanguage.jsx'
import { ModalAllLanguages } from './components/ModalAllLanguages.jsx'
import { useDebounce } from './hooks/useDebounce.jsx'
import { detectLanguage, translate } from './services/translate.js'
import { useStore } from './hooks/useStore.js'
import './App.css'

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
  const recognition = useRef(null)

  useEffect(() => {
    if (debounceValue.trim() === '' || text.trim() === '') return

    const languageDetected = async () => {
      const value = await detectLanguage(debounceValue).catch(err => console.error(err))
      const result = value.results[0]
      const payload = {
        from: result.language_name,
        fromCode: result.language_code,
        idiomaDetectado: true
      }
      setLanguageDetected(payload)
    }

    const translateText = async () => {
      try {
        const translatedText = await translate(fromCode, toCode, debounceValue)

        if (translatedText.status !== 'success') {
          resultTranslate({ result: 'Error' })
          return
        }

        if (translatedText.data.translatedText !== '') {
          resultTranslate({ result: translatedText.data.translatedText })
        }
      } catch (err) {
        console.error(err)
        resultTranslate({ result: 'Error' })
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
  // e iniciar la captura de audio del usuario
  const speech = () => {
    if (recognition.current == null) {
      // eslint-disable-next-line new-cap, no-undef
      recognition.current = new window.webkitSpeechRecognition()
    }

    const recog = recognition.current
    recog.lang = 'es-CO'
    if (speaking) {
      recog.stop()
      recognition.current = null
      setSpeaking({ speaking: false })
      return
    }

    recog.onsoundend = (e) => {
      recog.stop()
    }

    recog.onerror = (e) => {
      recognition.current = null
      setSpeaking({ speaking: false })
    }

    recog.onresult = (e) => {
      const textSpeech = e.results[0][0].transcript
      recognition.current = null
      setFromText({ text: textSpeech })
    }

    recog.start()
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
            type='to'
            text={result}
            speaking={speaking}
            loading={loading}
          />
        </section>
      </div>
    </main>
  )
}

export default App
