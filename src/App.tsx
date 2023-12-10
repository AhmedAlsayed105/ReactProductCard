import { productList } from "./Components/Data"
import ProductCard from "./Components/ProductCard"

function App() {
  const AllProduct = productList.map(item => ( <ProductCard key={item.id} products={item} />)) 
  return (
   <main className="container ">
     <div className=" sm:max-w-[100%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  m-1 p-2 rounded-md  gap-2 sm:gap-3 md:gap-1">
       {AllProduct}
     </div>
   </main>
  )
}

export default App
