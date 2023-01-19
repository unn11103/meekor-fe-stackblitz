import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import AddBankAccount from "./addBankAccount.js";
import AddPromptpayPage from "./addPromptpay.js";
import { useLiff } from "react-liff";
import { useLocation } from "react-router-dom";
import axios from "axios";

const AddAccountPage = () => {
  const location = useLocation();
  const billInfo = location.state;
  const [state, setState] = useState({
    accName: "",
    accNum: "",
    bankName: "",
  });
  const { liff } = useLiff();
  const [payUsers, setPayUsers] = useState([]);
  const [paymentType, setPaymentType] = useState(true);

  let date = new Date().toISOString().split("T")[0];

  console.log("Add acoount Page");
  //console.log(billInfo);
  useEffect(() => {
    //add distinct set of member who is consider in this bill
    let users = new Set([]);
    billInfo.itemList.map((item) => {
      item.member.map((member) => {
        users.add(member);
      });
    });
    setPayUsers(Array.from(users));
  }, []);

  console.log(payUsers);

  // calculate sum price
  const calSum = () => {
    let sum = 0;
    location.state.itemList.forEach(function (value, i, arr) {
      sum += +value.price;
    });
    return sum;
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setState({
      ...state,
      [event.target.name]: value,
    });
  };

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    console.log(selectedValue);
    setState({
      ...state,
      [event.target.name]: selectedValue,
    });
  };

  //TODO save to DB and sent bill to line group chat
  const onSubmit = async () => {
    let sum = calSum();
    //connect data

    const billObject = {
      id: 2,
      bill_name: location.state.billTitle,
      payment_info: {
        owner_line: location.state.owner_id,
        owner_promptpay: state.accNum,
      },
      create_date: date,
      total_price: sum,
      items: location.state.itemList,
    };
    console.log(billObject);

    //Save to DB....
    axios
      .post("http://localhost:3000/bill/create", billObject)
      .then((res) => console.log(res));

    //send into line
    const userList = payUsers.map((user) => {
      return {
        type: "box",
        layout: "horizontal",
        contents: [
          {
            type: "text",
            text: "" + user,
            color: "#FF0000",
          },
          {
            type: "text",
            text: "0" + " Bath",
            align: "end",
          },
        ],
      };
    });
    //console.log(userList);
    const message = [
      {
        type: "flex",
        altText: "flex message",
        contents: {
          type: "bubble",
          body: {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "text",
                text: "หมีขอ",
                margin: "none",
                color: "#009900",
                size: "sm",
              },
              {
                type: "text",
                text: billInfo.billTitle,
                weight: "bold",
                size: "xxl",
                margin: "md",
              },
              {
                type: "text",
                text: "เรียกเก็บ โดย" + billInfo.owner_name,
              },
              {
                type: "separator",
                margin: "lg",
              },
              {
                type: "box",
                layout: "vertical",
                margin: "lg",
                spacing: "xs",
                contents: userList,
              },
            ],
          },
          footer: {
            type: "box",
            layout: "vertical",
            spacing: "sm",
            contents: [
              {
                type: "button",
                style: "primary",
                height: "sm",
                action: {
                  type: "uri",
                  label: "จ่ายเงิน",
                  uri: "https://linecorp.com",
                },
              },
            ],
          },
        },
      },
    ];
    await liff
      .sendMessages(message)
      .then(() => {
        console.log("message sent");
      })
      .catch((err) => {
        console.log("error", err);
      });
    liff.closeWindow();
  };

  const bankList = [
    {
      value: "TTB",
      label: "ทหารไทยธนชาติ",
    },
    {
      value: "SCB",
      label: "ไทยพานิช",
    },
    {
      value: "KBANK",
      label: "กสิกรไทย",
    },
  ];

  return (
    <div>
      {/* <PaymentNavbar /> */}
      <div>
        <div class="w-full bg-teal-400 h-30">
          <h1 class="p-5"> เพิ่มบัญชีรับเงิน</h1>
        </div>
        <div class="flex justify-center  bg-gray-200 w-full ">
          <button
            class="p-3"
            onClick={() => {
              setPaymentType(true);
            }}
          >
            {" "}
            บัญชีธนาคาร{" "}
          </button>
          <button
            class="p-3"
            onClick={() => {
              setPaymentType(false);
            }}
          >
            {" "}
            พร้อมเพย์{" "}
          </button>
        </div>
      </div>
      <div>
        {paymentType ? (
          <AddBankAccount
            bankName={state.bankName}
            handleSelectChange={handleSelectChange}
            banklist={bankList}
            accountname={state.accName}
            handlechange={handleChange}
            accountnumber={state.accNum}
          />
        ) : (
          <AddPromptpayPage
            accountname={state.accName}
            accountnumber={state.accNum}
            handlechange={handleChange}
          />
        )}
      </div>

      {/* <div class="w-full grid grid-flow-row auto-rows-max p-5">
        <h1>บัญชีธนาคาร </h1>
        <select
          class="h-10 my-3"
          name="bankName"
          value={state.bankName}
          onChange={handleSelectChange}
        >
          {bankList.map((option) => (
            <option value={option.value}>{option.label} </option>
          ))}
        </select>
        <h1> ชื่อบัญชี</h1>
        <input
          class=" p-2 border-2 my-3"
          placeholder="ชื่อบัญชี"
          type="text"
          name="accName"
          value={state.accName}
          onChange={handleChange}
        />
        <h1> เลขบัญชี</h1>
        <input
          class=" p-2 border-2 my-3"
          placeholder="เลขบัญชี"
          type="number"
          name="accNum"
          value={state.accNum}
          onChange={handleChange}
        />
      </div> */}

      <div class="flex w-full justify-center">
        <button class="bg-teal-400 px-10 py-2 " onClick={onSubmit}>
          {" "}
          ยืนยันเก็บเงิน{" "}
        </button>
      </div>
    </div>
  );
};

export default AddAccountPage;
