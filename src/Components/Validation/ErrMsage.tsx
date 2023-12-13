

interface IProps   {
    msg : string
}

const ErrMessage = ({msg}: IProps) => {
  return (
    <> 
    {msg ? <span className="block text-red-500 font-semibold">{msg}</span> : null}
    </>
  )
  }



export default ErrMessage ;