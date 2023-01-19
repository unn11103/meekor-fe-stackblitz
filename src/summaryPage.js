import React from 'react';
import ListItem from './ListItem.js';
import { Link, useNavigate } from "react-router-dom";

const SummaryPage = () => {


  return (
    <div>
      <div class="h-screen grid grid-rows-6">
        <div class="bg-teal-400 ">
          <h1 class="text-white text-xl mx-5 pt-5">ค่าเหล้า</h1>
          <p class="text-white text-xl mx-5 ">700</p>
        </div>

        <div class="ml-5 mt-5 place-self-start row-span-3 ">
          <div class="text-gray-600">
            <h3>ยังไม่ได้จ่าย</h3>
          </div>
          <div class="mt-2 mx-5 place-self-start flex w-full space-between justify-center items-end">
            <p>cream</p>

           
          </div>
        </div>

        <div class=""></div>

        <div class="place-self-start flex w-full justify-center items-end">
        <button class="p-2  bg-gray-400 ">
            ต่อไป
          </button>
          <button class="p-2  bg-teal-400 w-1/2 mx-5">
            ต่อไป
          </button>
        </div>
      </div>
    </div>
  );
};
export default SummaryPage;
