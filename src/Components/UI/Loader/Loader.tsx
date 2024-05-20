import './Loader.css'

export const Loader = ({show}: {show: boolean}) => {
    return (        
        show ? (
            <div className='loader'></div>            
        ) : (
            null
        )
    )
}
