import { ChangeEvent, FormEvent, useState } from "react";
import {
  Colors,
  categories,
  formInputsList,
  productList,
} from "./Components/Data";
import ProductCard from "./Components/ProductCard";
import Model from "./Components/Ui/Model";
import Buttons from "./Components/Ui/Buttons";
import Input from "./Components/Ui/Input";
import { IApiData, ICategory } from "./Components/Data/typeData";
import FormProductValidation from "./Components/Validation/FormProductValidation";
import ColorForm from "./Components/Ui/ColorForm";
import ErrMessage from "./Components/Validation/ErrMsage";
import { v4 as uuidv4 } from "uuid";
import SelectedFn from "./Components/Ui/Select";
import { nameProductEdit } from "./Components/type/type";
import toast, { Toaster } from 'react-hot-toast';

function App() {
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
  
// const notify = () => toast('Here is your toast.');

  // get data on fileData and add product user enter on array and show the page
  const [productNews, setProductNews] = useState<IApiData[]>(productList);
  // selectCategories
  const [selectCategories, setSelectCategoties] = useState<ICategory>(
    categories[0]
  );
  // console.log(productNews);
  // arrColor click
  const [arrColor, setArrColor] = useState<string[]>([]);
  // console.log(arrColor);
  const [userInput, setUserInput] = useState<IApiData>(defaultUserInputObj);
  // console.log(userInput);
  const [editModelOnclickFullData, setEditModelOnclickFullData] =useState<IApiData>(defaultUserInputObj);
  // const [IsOpen,setEditModelIsOpen] = useState<IApiData>(defaultUserInputObj)
  const [productIndex,setProductIndex] = useState<number>(0);
  const [isOpenAdd, setIsOpenAdd] = useState(false);

  const [openPopeUpDelete, setOpenPopeUpDelete] = useState(false);

  const [isOpenModelEdit, setIsOpenModelEdit] = useState(false);

  // handel click
  function closeModal() {
    setIsOpenAdd(false);
    setIsOpenModelEdit(false);
    setOpenPopeUpDelete(false)
  }
  function openModal() {
    setIsOpenAdd(true);
  }

  function openModalEdit() {
    setIsOpenModelEdit(true);
  }
  function openModalDelete() {
    setOpenPopeUpDelete(true);
  }

  // message vai
  const [msgErr, setMsgErr] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
  });

  // handelChange
  const handelOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // console.log(name);

    setUserInput({ ...userInput, [name]: value });
    //
    setMsgErr({ ...msgErr, [name]: "" });
  };

  // handelOnChangeEdit
  const handelOnChangeEdit = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // console.log(name);

    setEditModelOnclickFullData({ ...editModelOnclickFullData, [name]: value });
    //
    setMsgErr({ ...msgErr, [name]: "" });
  };

  //CancelHandel
  const CancelHandel = () => {
    closeModal();
  };

  //submitHandel
  const submitHandel = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { title, description, image, price } = userInput;

    const validation = FormProductValidation({
      title,
      description,
      price,
      image,
    });
    // console.log(color);

    // check object is empty or no
    const checkValidation =
      Object.values(validation).some((item) => item == "") &&
      Object.values(validation).every((item) => item == "");
    // console.log(validation);
    // console.log(checkValidation);
    setMsgErr(validation);
    if (!checkValidation) {
      return;
    }

    setProductNews((prev) => [
      {
        ...userInput,
        id: uuidv4(),
        color: arrColor,
        category: selectCategories,
      },
      ...prev,
    ]);

    setUserInput(defaultUserInputObj);
    setArrColor([]);
    CancelHandel();

    toast("Product has been added successfully!", {
      icon: "👏",
      style: {
        backgroundColor: "black",
        color: "white",
      },
    });
  };
  //submitHandelEdit
  const submitHandelEdit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { title, description, image, price } = editModelOnclickFullData;

    const validation = FormProductValidation({
      title,
      description,
      price,
      image,
    });
    // console.log(color);

    // check object is empty or no
    const checkValidation =
      Object.values(validation).some((item) => item == "") &&
      Object.values(validation).every((item) => item == "");
    // console.log(validation);
    // console.log(checkValidation);
    setMsgErr(validation);
    if (!checkValidation) {
      return;
    }

    const updateDataProduct = [...productNews]
    
    updateDataProduct[productIndex] = {...editModelOnclickFullData,color:editModelOnclickFullData.color.concat(arrColor)} ;
    setProductNews(updateDataProduct);
    // console.log(updateDataProduct[productIndex]);
    
    
    setEditModelOnclickFullData(defaultUserInputObj);
    setArrColor([]);
    CancelHandel();
  };

  //
  const colorFormInpur = Colors.map((col) => (
    <ColorForm
      key={col}
      color={col}
      onClick={() => {
        if (arrColor.includes(col)) {
          // onClick filter arrColor
          setArrColor((prev) => prev.filter((item) => item !== col));
          return;
        }
        if (editModelOnclickFullData.color.includes(col)) {
          // onClick filter arrColor
          setArrColor((prev) => prev.filter((item) => item !== col));
          return;
        }
        //
        setArrColor((prev) => [...prev, col]);
      }}
    />
  ));

  // console.log(arrColor);
  
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
  /* end ProductComponents */

    const FormInputEdit = (id:string,title:string,name: nameProductEdit)=>{
      return(
        <div className="flex flex-col ">
        <label className="mb-[2px] text-sm font-medium text-gray-700">
        {title} 
        </label>
      <Input
        id={id}
        name={title}
        type={"text"}
        value={editModelOnclickFullData[name]}
        onChange={handelOnChangeEdit}
      />
         <ErrMessage msg={msgErr[name]}/>
        </div>
      )
    }


  // get dataFrom Product and render
  const AllProduct = productNews.map((item,index) => (
    <ProductCard
      key={item.id}
      products={item}
      setEditModelOnclickFullData={setEditModelOnclickFullData}
      openModalEdit={openModalEdit}
      index={index}
      setProductIndex={setProductIndex}
      OpenPopeUpDelete={openModalDelete}
    />
    
    ));
    // 
    




  // console.log(productNews[productIndex].title);
  // console.log(editModelOnclickFullData.title);
  const removeElement = ()=>{

    const filtered = productNews.filter((product)=> product.id !== editModelOnclickFullData.id)
    setProductNews(filtered)
    CancelHandel();
    
    toast('Product has been deleted successfully!',{
      icon: '👏',
      style: {
        backgroundColor: "#c2344d",
        color: "white",
      },
    })
    // if(filtered.length)
    // {
    //   return
    // }
  
}

  return (
    <main className="container ">
      <Buttons onClick={() => openModal()} classNameSide="bg-purple-600">
      Build a Product
      </Buttons>
      {/* Start ProductComponents */}
      <div className=" sm:max-w-[100%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  m-1 p-2 rounded-md  gap-2 sm:gap-3 md:gap-1">
        {AllProduct}
      </div>
      {/* End ProductComponents */}

      {/* start Add ModelComponents */}
      <Model
        isOpen={isOpenAdd}
        closeModal={closeModal}
        title={"ADD THIS PRODUCT"}
      >
        <form className="space-y-3" onSubmit={submitHandel}>
          {/* start data Input   */}
          {InputData}
          <div className="flex flex-col gap-y-2">
            <SelectedFn
              selected={selectCategories}
              setSelected={setSelectCategoties}
            />
            <div className="flex mb-2 gap-1">{colorFormInpur}</div>
            <div className="flex flex-wrap gap-1">
              {arrColor.map((col) => (
                <span
                  key={col}
                  className="  p-1 mx-1  text-sm text-white rounded-full"
                  style={{ background: col }}
                >
                  {col}
                </span>
              ))}
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
      {/* End Add ModelComponents */}

      {/* start Edit ModelComponents */}
      <Model
        isOpen={isOpenModelEdit}
        closeModal={closeModal}
        title={"EDIT THIS PRODUCT"}
      >
        <form className="space-y-3" onSubmit={submitHandelEdit}>
          {/* start data Input   */}
            {FormInputEdit("title","title","title")}
            {FormInputEdit("description","description","description")}
            {FormInputEdit("image","image","image")}
            {FormInputEdit("price","price","price")}
          {/* end data Input   */}
          <div className="flex flex-col gap-y-2">
          <SelectedFn
              selected={editModelOnclickFullData.category}
              setSelected={(value)=>setEditModelOnclickFullData({...editModelOnclickFullData,category:value})}
            />
            <div className="flex mb-2 gap-1">{colorFormInpur}</div>
            <div className="flex flex-wrap gap-1">
              {arrColor.concat(editModelOnclickFullData.color).map((col) => (
                <span
                  key={col}
                  className="  p-1 mx-1  text-sm text-white rounded-full"
                  style={{ background: col }}
                >
                  {col}
                </span>
              ))}
            </div>
            <Buttons classNameSide="bg-purple-600">Edit</Buttons>
            <Buttons onClick={CancelHandel} classNameSide="bg-gray-400">
              Cancel
            </Buttons>
          </div>
        </form>
      </Model>
      {/* End Edit ModelComponents */}
      <Model
        isOpen={openPopeUpDelete}
        closeModal={closeModal}
        title="Are you sure you want to remove this Product from your Store?"
      >
        <form className="space-y-3 " onSubmit={submitHandelEdit}>
          <div>
            {productNews[productIndex].description}
          </div>
           <div className="flex gap-2">
             <Buttons classNameSide="bg-red-600" onClick={removeElement}>Yes</Buttons>
             <Buttons  onClick={ closeModal} classNameSide="bg-gray-400">
               No
             </Buttons>
           </div>
        </form>
      </Model>
      <Toaster />
      {/* start popupDelate */}
    </main>
  );
}

export default App;
