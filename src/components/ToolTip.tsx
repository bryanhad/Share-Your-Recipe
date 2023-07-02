type Props = {
    children: React.ReactNode
    tooltipText: string
    // direction: "top" | "left" | "right" | "bottom"
}

export default function ToolTip({ children, tooltipText, direction }: Props) {
    // let toolTipClassName = {
    //     container: '',
    //     arrow: ''
    // }
    // switch(direction) {
    //     case 'bottom':
    //         toolTipClassName = {
    //             container: '',
    //             arrow: ''
    //         }
    // }

    const after = "absolute top-[-0.5rem] "

    return (
        <div className="">
            <div className=""></div>

            <div className="">{children}</div>
            <span>{tooltipText}</span>
        </div>
    )
}
