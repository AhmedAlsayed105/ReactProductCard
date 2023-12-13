import { HTMLAttributes } from "react"


interface IProps extends HTMLAttributes<HTMLSpanElement> {
    color:string
}

const ColorForm = ({color , ...res}: IProps) => {
  return (
          <span
            style={{
              background: `${color}`,
            }}
            className={`block   w-4 h-4 rounded-full  cursor-pointer`}
          {...res}/>
  )
}

export default ColorForm