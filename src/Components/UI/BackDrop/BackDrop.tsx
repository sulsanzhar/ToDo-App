import './BackDrop.sass'

type TBackDrop = {
    show: boolean
    close: VoidFunction
}

export const BackDrop = ({show, close}: TBackDrop) => {
    return (
        <div
            className="BackDrop"
            onClick={close}
            style={{display: show ? 'block' : 'none'}}
            >
        </div>
    )
}
