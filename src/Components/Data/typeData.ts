export interface IApiData 
{
    id:number
    title:string
    price:number
    description:string,
    color:string[]
    image: string
    category: {
        name:string
        image: string
    }
}