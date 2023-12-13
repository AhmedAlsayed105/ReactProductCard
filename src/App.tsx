import { ChangeEvent, FormEvent, useState } from "react";
import { Colors, formInputsList, productList } from "./Components/Data";
import ProductCard from "./Components/ProductCard";
import Model from "./Components/Ui/Model";
import Buttons from "./Components/Ui/Buttons";
import Input from "./Components/Ui/Input";
import { IApiData } from "./Components/Data/typeData";
import FormProductValidation from "./Components/Validation/FormProductValidation";
import ErrMessage from "./Components/Validation/errMsage";
import ColorForm from "./Components/Ui/ColorForm";

function App() {
  // message vai
  const [msgErr, setMsgErr] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
  });
  // arrColor click
  const [arrColor, setArrColor] = useState<string[]>([]);
  // console.log(arrColor);

  const defaultUserInputObj = {
    title: "",
    description: "",
    image: "",
    price: "",
    color: [],
    category: {
      name: "",
      image: "",
    },
  };
  const [userInput, setUserInput] = useState<IApiData>(defaultUserInputObj);
  // handelChange
  const handelOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
    //
    setMsgErr({ ...msgErr, [name]: "" });
  };
  //CancelHandel
  const CancelHandel = () => {
    setUserInput(defaultUserInputObj);
    closeModal();
  };

  //submitHandel
  const submitHandel = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validation = FormProductValidation({
      title: userInput.title,
      description: userInput.description,
      price: userInput.price,
      image: userInput.image,
    });
    // check object is empty or no
    const checkValidation =
      Object.values(validation).some((item) => item == "") &&
      Object.values(validation).every((item) => item == "");
    console.log(validation);
    console.log(checkValidation);
    setMsgErr(validation);
    if (!checkValidation) {
      return;
    }
  };

  //
  const colorFormInpur = Colors.map((col) => (
    <ColorForm
      key={col}
      color={col}
      onClick={()=>{
        if(arrColor.includes(col))
        {
          // onClick filter arrColor
          setArrColor(prev => prev.filter(item => item !== col))
          return ;
        }
        // 
        setArrColor((prev) => [...prev, col])
      }}
    />
  ));

  // console.log(colorFormInpur);

  const [isOpen, setIsOpen] = useState(false);
  // handel click
  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }
  const InputData = formInputsList.map((item) => (
    <div key={item.id} className="flex flex-col ">
      <label className="mb-[2px] text-sm font-medium text-gray-700">
        {item.label}
      </label>
      <Input
        id={item.id}
        name={item.name}
        type={item.type}
        value={userInput[item.name]}
        onChange={handelOnChange}
      />
      <ErrMessage msg={msgErr[item.name]} />
    </div>
  ));

  {
    /* end ProductComponents */
  }

  // get dataFrom Product and render
  const AllProduct = productList.map((item) => (
    <ProductCard key={item.id} products={item} />
  ));
  return (
    <main className="container ">
      <Buttons onClick={() => openModal()} classNameSide="bg-purple-600">
        Open
      </Buttons>
      {/* Start ProductComponents */}
      <div className=" sm:max-w-[100%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  m-1 p-2 rounded-md  gap-2 sm:gap-3 md:gap-1">
        {AllProduct}
      </div>
      {/* End ProductComponents */}

      {/* start ModelComponents */}
      <Model isOpen={isOpen} closeModal={() => setIsOpen(isOpen)} title="Edit">
        <form className="space-y-3" onSubmit={submitHandel}>
          {/* start data Input   */}
          {InputData}
          <div className="">
            <div className="flex mb-2 gap-1">
            {colorFormInpur}
            </div>
            <div className="flex flex-wrap gap-1">
            {
              arrColor.map(col => (
                <span
                className="  p-1 mx-1  text-sm text-white rounded-full"
                style={{ background: col }}
                >
                {col}
              </span>
              ))
            }
            </div>
            </div>
          {/* end data Input   */}
          <div className="flex items-center space-x-3">
            <Buttons classNameSide="bg-purple-600">Submit</Buttons>
            <Buttons onClick={CancelHandel} classNameSide="bg-gray-400">
              Cancel
            </Buttons>
          </div>
        </form>
      </Model>
      {/* End ModelComponents */}
    </main>
  );
}

export default App;
