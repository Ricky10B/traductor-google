/* eslint-disable no-undef */
import {
  IconCopyClipboard,
  IconSound,
  IconSpeakTranslate,
  IconoEquis
} from './Icons.jsx'

export const Textarea = ({
  placeholder,
  disabled,
  type,
  handleText,
  text,
  deleteText,
  speech,
  speaking,
  loading
}) => {
  const listenText = () => {
    const voices = speechSynthesis.getVoices()
    const speech = new window.SpeechSynthesisUtterance(text)
    speech.voice = voices[8]
    speechSynthesis.speak(speech)
  }

  const handleCopyClipboard = (textTranslated) => {
    navigator.clipboard.writeText(textTranslated)
  }

  return (
    <div className={`relative ${type === 'to' && 'bg-[#303134] rounded-lg'}`}>
      <textarea
        placeholder={loading ? 'Traduciendo...' : placeholder}
        className={`resize-none text-2xl py-2 px-4 w-full ${type === 'from' && 'bg-transparent w-[93%] pr-12'} outline-none h-4/5`}
        rows='7'
        maxLength={5000}
        disabled={disabled}
        value={text}
        onChange={handleText}
      />
      {type === 'from' && text.trim() && !speaking &&
        <div className='absolute top-2 right-2 cursor-pointer containerIcon' onClick={deleteText}>
          <IconoEquis />
        </div>}
      <div className='absolute bottom-4 flex gap-5 ml-4'>
        {type === 'from' &&
          <div onClick={speech} className={`cursor-pointer containerIcon ${speaking && 'bg-[#ff2222] p-2 rounded-full'}`}>
            <IconSpeakTranslate speaking={speaking} />
          </div>}
        {type === 'to' && text.trim() && !speaking &&
          <div onClick={() => handleCopyClipboard(text)} className='cursor-pointer containerIcon'>
            <IconCopyClipboard />
          </div>}
        {text.trim() && !speaking &&
          <div onClick={listenText} className='cursor-pointer containerIcon'>
            <IconSound />
          </div>}
      </div>
    </div>
  )
}
