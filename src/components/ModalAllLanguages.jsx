import { IconoEquis } from './Icons'
import { languages } from '../mocks/languages.json'
import { useStore } from '../hooks/useStore'

export const ModalAllLanguages = ({
  handleCloseSearchLanguage,
  type,
  handleLanguageSelected
}) => {
  const { languageFilters, setLanguageFilters } = useStore()

  const handleInputLanguages = (allLanguages, e) => {
    const { value } = e.target
    const languagesFilters = allLanguages.filter((language) =>
      language.name.toLowerCase().includes(value.toLowerCase())
    )

    setLanguageFilters({ languageFilters: languagesFilters })
  }

  return (
    <div className='absolute w-full h-[80vh] sm:h-[50vh] py-2 bg-[#202124] z-10'>
      <form className='flex gap-2 mb-4'>
        <input
          type='text'
          placeholder='Traducir del'
          id='buscarIdioma'
          className='w-full border border-solid border-[#3c4043] rounded-lg box-border text-[#bdc1c6] text-sm h-10 pl-4 pr-10 top-2 left-2 outline-none'
          onChange={(e) => handleInputLanguages(languages, e)}
          autoFocus
        />
        <button type='submit' onClick={(e) => handleCloseSearchLanguage(e, false, type)} className='containerIcon'>
          <IconoEquis />
        </button>
      </form>
      <div className='grid grid-cols-2 sm:grid-cols-3 gap-y-2 gap-x-4 h-full overflow-auto bg-[#202124]'>
        {
          type === 'from' &&
            <button
              onClick={() => handleLanguageSelected('Detectar idioma', 'auto', type, true)}
            >
              Detectar idioma
            </button>
        }
        {languageFilters.map((language) => (
          <button
            key={language.code}
            onClick={() => handleLanguageSelected(language.name, language.code, type, false)}
          >
            {language.name}
          </button>
        ))}
      </div>
    </div>
  )
}
