import { MdModeEditOutline } from "react-icons/md"

export default function EditButton({htmlFor, className, onClick}:{htmlFor?:string, className?:string, onClick?:() => void}) {

  if (htmlFor) {
    <label htmlFor={htmlFor} className={`cursor-pointer rounded-full bg-white/80 text-slate-400 ${className ? className : ''}`} >
      <MdModeEditOutline />
    </label>
  }

  return (
    <button
    onClick={onClick}
    className={`rounded-full bg-white/80 text-slate-400 cursor-pointer ${className ? className : ''}`}
>
    <MdModeEditOutline/>
    </button>
  )
}
