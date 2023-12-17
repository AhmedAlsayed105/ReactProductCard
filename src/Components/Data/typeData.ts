import { nameProductEdit } from "../type/type"

export interface IApiData 
{
    id?:string
    title:string
    price:string
    description:string,
    color:string[]
    image: string
    category: {
        name:string
        image: string
    }
}
export interface formInputsType 
{
    id:string
    name:nameProductEdit
    label:string
    type:string 
}
export interface ICategory {
    id: string;
    name: string;
    image: string;
  }
  