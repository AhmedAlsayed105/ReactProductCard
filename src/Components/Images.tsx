import {  ImgHTMLAttributes } from "react"

interface Iimg extends ImgHTMLAttributes<HTMLImageElement> {
    imgUrl:string
    alt:string
    className:string
}

const Images = ({imgUrl,className,alt,...res}: Iimg) => {
  // console.log(imgUrl);
  
  return (
    <img className={`${className } ` } alt={alt} {...res} src={imgUrl} />
  )
}

export default Images