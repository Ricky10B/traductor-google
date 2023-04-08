import { useReducer } from 'react'
import { initialState, reducer } from '../reducers/reducer'

export function useStore () {
  const [{
    languageFilters,
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
    result
  }, dispatch] = useReducer(reducer, initialState)

  const setSpeaking = (payload) => {
    dispatch({ type: 'SPEAKING', payload })
  }

  const setFromText = (payload) => {
    dispatch({ type: 'SET_FROM_TEXT', payload })
  }

  const deleteFromText = () => {
    dispatch({ type: 'DELETE_FROM_TEXT' })
  }

  const setLanguageFilters = (payload) => {
    dispatch({
      type: 'SET_LANGUAGE_FILTERS',
      payload
    })
  }

  const setFromLanguageSelected = (payload) => {
    dispatch({
      type: 'SET_FROM_LANGUAGE_SELECTED',
      payload
    })
  }

  const setToLanguageSelected = (payload) => {
    dispatch({
      type: 'SET_TO_LANGUAGE_SELECTED',
      payload
    })
  }

  const closeSearchLanguage = (payload) => {
    dispatch({
      type: 'CLOSE_SEARCH_LANGUAGE',
      payload
    })
  }

  const interchangeLanguages = () => {
    dispatch({ type: 'INTERCHANGE_LANGUAGES' })
  }

  const setLanguageDetected = (payload) => {
    dispatch({
      type: 'LANGUAGE_DETECTED',
      payload
    })
  }

  const resultTranslate = (payload) => {
    dispatch({ type: 'RESULT_TRANSLATE', payload })
  }

  return {
    languageFilters,
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
    setLanguageFilters,
    setFromLanguageSelected,
    setToLanguageSelected,
    closeSearchLanguage,
    interchangeLanguages,
    setLanguageDetected,
    resultTranslate
  }
}
