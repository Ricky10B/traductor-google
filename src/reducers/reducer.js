import { languages } from '../mocks/languages.json'

export const initialState = {
  languageFilters: languages,
  show: false,
  type: '',
  from: 'Detectar idioma',
  fromCode: 'auto',
  to: 'Spanish',
  toCode: 'es',
  auto: true,
  speaking: false,
  loading: false,
  idiomaDetectado: false,
  text: '',
  result: ''
}

export function reducer (state, action) {
  const { type } = action

  if (type === 'SPEAKING') {
    return {
      ...state,
      speaking: action.payload.speaking
    }
  }

  if (type === 'SET_FROM_TEXT') {
    const text = action.payload.text

    if (state.auto && text.trim() === '') {
      return {
        ...state,
        text,
        result: '',
        from: 'Detectar idioma',
        fromCode: 'auto',
        idiomaDetectado: false,
        speaking: false,
        loading: false
      }
    }

    if (!state.auto && text.trim() === '') {
      return {
        ...state,
        text,
        result: '',
        idiomaDetectado: false,
        speaking: false,
        loading: false
      }
    }

    return {
      ...state,
      text,
      result: '',
      speaking: false,
      loading: true
    }
  }

  if (type === 'DELETE_FROM_TEXT') {
    if (!state.auto) {
      return {
        ...state,
        text: '',
        result: '',
        idiomaDetectado: false,
        loading: false
      }
    }

    return {
      ...state,
      text: '',
      result: '',
      from: 'Detectar idioma',
      fromCode: 'auto',
      idiomaDetectado: false,
      loading: false
    }
  }

  if (type === 'SET_LANGUAGE_FILTERS') {
    return {
      ...state,
      languageFilters: action.payload.languageFilters
    }
  }

  if (type === 'SET_FROM_LANGUAGE_SELECTED') {
    return {
      ...state,
      from: action.payload.from,
      fromCode: action.payload.fromCode,
      auto: action.payload.isAuto,
      idiomaDetectado: action.payload.idiomaDetectado,
      show: false,
      type: '',
      languageFilters: languages
    }
  }

  if (type === 'SET_TO_LANGUAGE_SELECTED') {
    return {
      ...state,
      to: action.payload.to,
      toCode: action.payload.toCode,
      auto: action.payload.isAuto,
      idiomaDetectado: action.payload.idiomaDetectado,
      show: false,
      type: '',
      languageFilters: languages
    }
  }

  if (type === 'CLOSE_SEARCH_LANGUAGE') {
    return {
      ...state,
      show: action.payload.showSearch,
      type: action.payload.type,
      languageFilters: languages
    }
  }

  if (type === 'INTERCHANGE_LANGUAGES') {
    if (state.fromCode === 'auto') return state
    if (state.fromCode === state.toCode) return state

    return {
      ...state,
      from: state.to,
      fromCode: state.toCode,
      to: state.from,
      toCode: state.fromCode,
      idiomaDetectado: false,
      auto: false,
      loading: true,
      text: state.result,
      result: ''
    }
  }

  if (type === 'LANGUAGE_DETECTED') {
    return {
      ...state,
      from: action.payload.from,
      fromCode: action.payload.fromCode,
      idiomaDetectado: action.payload.idiomaDetectado
    }
  }

  if (type === 'RESULT_TRANSLATE') {
    if (state.fromCode === state.toCode) {
      return {
        ...state,
        result: state.text,
        loading: false
      }
    }

    return {
      ...state,
      result: action.payload.result
    }
  }

  return state
}
