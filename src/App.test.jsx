import { cleanup, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { test, expect, afterEach, beforeEach, describe } from 'vitest'
import App from './App'

describe('Features Principals of translator', () => {
  let app

  beforeEach(() => {
    app = render(<App />)
  })

  afterEach(() => {
    cleanup()
  })

  test('My app works as expected', async () => {
    const textareaFrom = app.getByPlaceholderText('Ingresar texto')
    await userEvent.type(textareaFrom, 'Hello World')
    const result = await app.findByDisplayValue(/Hola Mundo/i, {}, { timeout: 5000 })

    expect(result).toBeTruthy()
  })

  test('Select the language and translate correctly', async () => {
    const leftSelectLanguage = app.getByText(/detectar idioma/i)
    await userEvent.click(leftSelectLanguage)

    const inputSearchLanguage = app.getByPlaceholderText(/traducir del/i)
    await userEvent.type(inputSearchLanguage, 'Spanish')

    const buttonLanguageSpanish = app.getByRole('button', { name: 'Spanish' })
    await userEvent.click(buttonLanguageSpanish)

    const textareaFrom = app.getByPlaceholderText(/ingresar texto/i)
    await userEvent.type(textareaFrom, 'Hola, como están?')
    const result = await app.findByDisplayValue('Hola, como están?', {}, { timeout: 2000 })

    expect(result).toBeTruthy()
  })
})
