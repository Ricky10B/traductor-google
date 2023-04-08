import { IconShowLanguages } from './Icons.jsx'

export const SelectLanguage = ({
  handleCloseSearchLanguage,
  selectedLanguage,
  idiomaDetectado,
  type
}) => {
  return (
    <div
      className='flex justify-between items-center px-4 border border-solid border-[#5f6368] rounded-lg h-10 text-sm cursor-pointer'
      onClick={(e) => handleCloseSearchLanguage(e, true, type)}
    >
      <span className='text-[#8ab4f8]'>
        {idiomaDetectado ? selectedLanguage + ' Detectado' : selectedLanguage}
      </span>
      <span className='fill-[#8ab4f8]'>
        <IconShowLanguages />
      </span>
    </div>
  )
}
