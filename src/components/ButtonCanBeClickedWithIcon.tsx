
type Props = {
    onClick:() => void
    className?: string
    direction: 'left' | 'right'
    iconClassName: string
    icon: React.ReactNode
    text:string
}

export default function ButtonCanBeClickedWithIcon(props:Props) {
  return (
    <button onClick={props.onClick} className={`flex gap-2 items-center ${props.className}`}>
        {props.direction === 'left' && (
            <span className={props.iconClassName}>
                {props.icon}
            </span>
        )}
        {props.text}
        {props.direction === 'right' && (
            <span className={props.iconClassName}>
                {props.icon}
            </span>
        )}
    </button>
  )
}
