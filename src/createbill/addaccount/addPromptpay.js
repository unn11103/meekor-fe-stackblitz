import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useLiff } from "react-liff";

const AddPromptpayPage = ({ handlechange, accountname, accountnumber }) => {
  // const [state, setState] = useState({
  //   accName: "",
  //   accNum: "",
  // });
  // const { isLoggedIn, isReady, liff } = useLiff();

  // const handleChange = (event) => {
  //   const value = event.target.value;
  //   setState({
  //     ...state,
  //     [event.target.name]: value,
  //   });
  // };
  // //TODO save to DB and sent bill to line group chat
  // const onSubmit = async () => {
  //   console.log(state.accName, state.accNum);
  //   await liff
  //     .sendMessages([
  //       {
  //         type: "flex",
  //         altText: "flex message",
  //         contents: {
  //           type: "bubble",
  //           body: {
  //             type: "box",
  //             layout: "vertical",
  //             contents: [
  //               {
  //                 type: "text",
  //                 text: "หมีขอ",
  //                 margin: "none",
  //                 color: "#009900",
  //                 size: "sm",
  //               },
  //               {
  //                 type: "text",
  //                 text: "ชื่อบิล",
  //                 weight: "bold",
  //                 size: "xxl",
  //                 margin: "md",
  //               },
  //               {
  //                 type: "text",
  //                 text: "เรียกเก็บ โดย user",
  //               },
  //               {
  //                 type: "separator",
  //                 margin: "lg",
  //               },
  //               {
  //                 type: "box",
  //                 layout: "vertical",
  //                 margin: "lg",
  //                 spacing: "xs",
  //                 contents: [
  //                   {
  //                     type: "text",
  //                     text: "@user1",
  //                     color: "#FF0000",
  //                   },
  //                   {
  //                     type: "text",
  //                     text: "@user2",
  //                     color: "#FF0000",
  //                   },
  //                   {
  //                     type: "text",
  //                     text: "@user3",
  //                     color: "#FF0000",
  //                   },
  //                 ],
  //               },
  //             ],
  //           },
  //           footer: {
  //             type: "box",
  //             layout: "vertical",
  //             spacing: "sm",
  //             contents: [
  //               {
  //                 type: "button",
  //                 style: "primary",
  //                 height: "sm",
  //                 action: {
  //                   type: "uri",
  //                   label: "จ่ายเงิน",
  //                   uri: "https://linecorp.com",
  //                 },
  //               },
  //             ],
  //           },
  //         },
  //       },
  //     ])
  //     .then(() => {
  //       console.log("message sent");
  //     })
  //     .catch((err) => {
  //       console.log("error", err);
  //     });

  //   liff.closeWindow();
  // };

  return (
    <div>
      <div class="w-full grid grid-flow-row auto-rows-max p-5">
        <h1> ชื่อบัญชี</h1>
        <input
          class=" p-2 border-2 my-3"
          placeholder="ชื่อบัญชี"
          type="text"
          name="accName"
          value={accountname}
          onChange={handlechange}
        />
        <h1> หมายเลขโทรศัพท์</h1>
        <input
          class=" p-2 border-2 my-3"
          placeholder="08x-xxx-xxxx"
          type="number"
          name="accNum"
          value={accountnumber}
          onChange={handlechange}
        />
      </div>
      {/* <div class="flex w-full justify-center">
        <button class="bg-teal-400 px-10 py-2 " onClick={onSubmit}>
          {" "}
          ยืนยันเก็บเงิน{" "}
        </button>
      </div> */}
    </div>
  );
};

export default AddPromptpayPage;
