import { ButtonHTMLAttributes, ReactNode } from "react"

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement>  {
  children:ReactNode
  classNameSide?:string
}

export default function Buttons({children,classNameSide ,...res}: IProps) {
  // console.log(res);
  
  return (
   <button className={`${classNameSide} text-white p-1 rounded-[5px] w-full`} {...res}
   >
        {children}
    </button>
  )
}