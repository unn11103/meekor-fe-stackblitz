import React, { useState } from "react";
const AddBankAccount = ({
  bankName,
  handleSelectChange,
  banklist,
  accountname,
  handlechange,
  accountnumber,
}) => {
  return (
    <div class="w-full grid grid-flow-row auto-rows-max p-5">
      <h1>บัญชีธนาคาร </h1>
      <select
        class="h-10 my-3"
        name="bankName"
        value={bankName}
        onChange={handleSelectChange}
      >
        {banklist.map((option) => (
          <option value={option.value}>{option.label} </option>
        ))}
      </select>
      <h1> ชื่อบัญชี</h1>
      <input
        class=" p-2 border-2 my-3"
        placeholder="ชื่อบัญชี"
        type="text"
        name="accName"
        value={accountname}
        onChange={handlechange}
      />
      <h1> เลขบัญชี</h1>
      <input
        class=" p-2 border-2 my-3"
        placeholder="เลขบัญชี"
        type="number"
        name="accNum"
        value={accountnumber}
        onChange={handlechange}
      />
    </div>
  );
};
export default AddBankAccount;
