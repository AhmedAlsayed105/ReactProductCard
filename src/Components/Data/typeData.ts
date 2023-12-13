export interface IApiData 
{
    id?:number
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
    name:"image"|"price"|"description"|"title"
    label:string
    type:string 
}