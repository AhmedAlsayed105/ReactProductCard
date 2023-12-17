const  FormProductValidation = (product: {title: string;price: string;description: string;image: string;}) => 
{
  // console.log(product);
  
  const erro:{title: string;price: string;description: string;image: string;} =
   {
    title: "",
    description: "",
    image: "",
    price: "",
  };
  const urlRegexImage = /^(ftp|http|https):\/\//i.test(product.image);

  if(!product.title.trim() || product.title.length < 10 || product.title.length > 80){
    erro.title = "Prodcut title must be between 10 and 80 characters" 
  }
  if(!product.description.trim() || product.description.length < 10 || product.description.length > 500)
  {
    erro.description = "Prodcut title must be between 10 and 500 characters" 
  }
  if(!product.image.trim() || !urlRegexImage)
  {
    erro.image = "valid image URL ia required"
  }
  if(!product.price.trim() ||  isNaN(Number(product.price)) ){
    erro.price = "valid Price ia required"
  }
  // if (product.color.length === 0) {
  //   erro.color = "At least one valid color is required";
  // }
  return erro
}
export default FormProductValidation