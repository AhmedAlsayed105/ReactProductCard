import { IApiData } from "./Data/typeData";
import Images from "./Images";
import Buttons from "./Ui/Buttons";
import { textSlice } from "./Ui/textSlice";

interface Iproduct {
  products: IApiData;
}

const ProductCard = ({ products }: Iproduct) => {
  // console.log(products);
  const { title, description, price, color, image, category } = products;

  // productList

  return (
    <div className="  shadow-lg shadow-blue-500/20  max-w-sm mx-auto border p-2 rounded-md flex flex-col ">
      <div className="   w-[200px]	h-[200px]  rounded-md  mx-4">
        <Images
          className="w-full	 h-full object-contain 	rounded-md   "
          imgUrl={image}
          alt="product-photo"
        />
      </div>
      <h2 className="text-black font-medium my-2"> {textSlice(title,19)} </h2>
      <p className="">{textSlice(description)}</p>
      <div className="flex align-middle gap-1 my-4">
        {color.map((col) => (
          <span
            key={col}
            style={{
              background: `${col}`,
            }}
            className={`w-4 h-4 rounded-full  cursor-pointer`}
          />
        ))}
      </div>
      <div className=" flex justify-between my-2 items-center">
        <span className="font-medium ">${price}</span>
        <Images
          className="w-10 h-10 rounded-full object-bottom border border-sky-600"
          imgUrl={image}
          alt="product-photo"
          
        />
      </div>
      <div className="flex gap-1 mt-2 mb-0 text-white">
        <Buttons classNameSide="bg-purple-600" >
          Edit
        </Buttons>
        <Buttons classNameSide="bg-red-500">Delete</Buttons>
      </div>
    </div>
  );
};

export default ProductCard;
