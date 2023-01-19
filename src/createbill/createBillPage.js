import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLiff } from "react-liff";

const CreateBillPage = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    billTitle: "",
    serviceCharge: "",
    vat: "",
    discount: "",
  });
  const [inputList, setinputList] = useState([{ item: "", price: "" }]);
  const [profile, setProfile] = useState({
    userId: "Default",
    displayName: "Default",
  });
  const [context, setContext] = useState({
    groupId: "C1fe81d2a7d101b2578259505bd232573",
  });

  const { liff, isLoggedIn } = useLiff();

  useEffect(() => {
    if (!isLoggedIn) return;
    liff.ready.then(() => {
      if (liff.isInClient()) {
        liff.getProfile().then((profile) => {
          setProfile(profile);
        });
        const cont = liff.getContext();
        console.log(cont);
        setContext(cont);
      }
    });
  }, [liff, isLoggedIn]);

  const passValue = () => {
    navigate("/separate_bill", {
      state: {
        billTitle: state.billTitle,
        itemList: inputList,
        vat: state.vat,
        serviceCharge: state.serviceCharge,
        discount: state.discount,
        owner_id: profile.userId,
        owner_name: profile.displayName,
      },
    });
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setState({
      ...state,
      [event.target.name]: value,
    });
  };

  const testValue = () => {
    let output = [];
    output.push(inputList);
    output.push(state);
    console.log(output);
  };

  const handleinputchange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setinputList(list);
  };

  const handleremove = (index) => {
    console.log("index", index);

    const list = [...inputList];
    list.splice(index, 1);
    setinputList(list);
  };

  const handleaddclick = () => {
    setinputList([...inputList, { item: "", price: "" }]);
  };

  return (
    <div>
      <div class="flex flex-col h-full">
        <div class=" w-screen h-32 min-h-1/5 bg-teal-400">
          <h1 for="title" class="text-3xl text-white mt-4 ml-5">
            ชื่อบิล
          </h1>
          <div>
            <input
              name="billTitle"
              value={state.billTitle}
              placeholder="bill Title"
              onChange={handleChange}
              class=" ml-5 mt-2 rounded-sm w-5/6 h-8 p-1"
            />
          </div>
        </div>
        <div class="ml-5 mt-10">
          <h1 class="text-gray-600 text-lg ">รายการ </h1>
        </div>

        <div>
          {inputList.map((x, i) => {
            // console.log('i==', i)
            return (
              <div className=" my-3 ml-5">
                <div className="flex items-center w-screen">
                  <div class="w-full mr-1">
                    <input
                      type="text"
                      name="item"
                      class="w-full border-2 border-gray-400 rounded-sm p-1"
                      placeholder="รายการ"
                      onChange={(e) => handleinputchange(e, i)}
                    />
                  </div>
                  <div class="w-1/2 mx-1">
                    <input
                      type="number"
                      name="price"
                      class="w-full border-2 border-gray-400 rounded-sm p-1"
                      placeholder="ราคา"
                      onChange={(e) => handleinputchange(e, i)}
                    />
                  </div>
                  <div class="w-1/3 ">
                    {inputList.length !== 1 && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="w-6 h-6 text-red-500"
                        onClick={() => handleremove(i)}
                      >
                        <path
                          fill-rule="evenodd"
                          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm3 10.5a.75.75 0 000-1.5H9a.75.75 0 000 1.5h6z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                </div>

                {inputList.length - 1 === i && (
                  <div>
                    <button
                      className="bg-gray-300 p-2 rounded-lg drop-shadow-md mt-3 text-gray-700
                      hover: bg-gray-400 "
                      onClick={handleaddclick}
                    >
                      เพิ่มรายการ
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div class="my-1 items-center w-screen mx-5">
          <div class="flex w-full my-2">
            <h1 class=" w-full border-2 border-gray-300 p-1 text-md text-gray-700">
              Service Charge
            </h1>
            <input
              class="w-1/2 border-2 rounded-sm p-1 mx-1"
              type="number"
              value={state.serviceCharge}
              name="serviceCharge"
              onChange={handleChange}
            />
            <div class="w-1/3" />
          </div>
          <div class="flex w-full mb-2">
            <h1 class=" w-full border-2 border-gray-300 p-1 text-md text-gray-700">
              VAT
            </h1>
            <input
              class="w-1/2 border-2 rounded-sm p-1 mx-1"
              type="number"
              value={state.vat}
              name="vat"
              onChange={handleChange}
            />
            <div class="w-1/3" />
          </div>
          <div class="flex w-full">
            <h1 class=" w-full border-2 border-gray-300 p-1 text-md text-gray-700">
              ส่วนลด
            </h1>
            <input
              class="w-1/2 border-2 rounded-sm p-1 mx-1"
              type="number"
              value={state.discount}
              name="discount"
              onChange={handleChange}
            />
            <div class="w-1/3" />
          </div>
        </div>
        <div class="flex justify-center items-end w-full h-full mt-10 mb-8 mr-5">
          <Link
            to={"/separate_bill"}
            state={{
              billTitle: state.billTitle,
              itemList: inputList,
              vat: state.vat,
              serviceCharge: state.serviceCharge,
              discount: state.discount,
              owner_id: profile.userId,
              owner_name: profile.displayName,
              groupId: context.groupId,
            }}
            class="w-full flex justify-center"
          >
            <button
              class="bg-green-500 w-2/3 p-2 text-white rounded-lg hover:bg-green-600"
              onClick={passValue}
            >
              ต่อไป
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default CreateBillPage;
