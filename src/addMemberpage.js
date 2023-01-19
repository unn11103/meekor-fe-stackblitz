import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SecondPage from './SecondPage.js';
import { Link } from 'react-router-dom';

const AddMemberPage = () => {
  const [checked, setChecked] = useState([]);

  // mockData(group members)
  const checkList = ['Unn', 'HB', 'Creamder', 'gade'];

  // Add/Remove checked item from list
  const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };

  // Generate string of checked items
  const checkedItems = checked.length
    ? checked.reduce((total, item) => {
        return total + ', ' + item;
      })
    : '';

  var isChecked = (item) =>
    checked.includes(item) ? 'checked-item' : 'not-checked-item';

  const onSubmit = () => {
    console.log(checkedItems);
  };

  return (
    <div>
      {/* <Routes>
        <Route path="/secondPage"  element={<SecondPage/>}/>
      </Routes> */}

      <div class="h-screen grid grid-rows-6">
        <div class="bg-teal-400 ">
          <h1 class="text-white text-xl mx-5 pt-5">เก็บเงินใครบ้าง</h1>
        </div>

        {/* checkbox */}
        <div class="ml-5 mt-5 place-self-start row-span-3 ">
          <div class="text-gray-600">รายชื่อ:</div>
          <div class="mt-2">
            {checkList.map((item, index) => (
              <div key={index}>
                <input value={item} type="checkbox" onChange={handleCheck} />
                <span className={isChecked(item)}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* <div class="">{`output test: ${checkedItems}`}</div> */}

        <div class="place-self-start flex w-full justify-center items-end">
          <Link
            to={{
              pathname: '/second',
              state: checkedItems,
            }}
            class="p-2  w-1/2"
          >
            <button
              type="button"
              class="p-2  bg-teal-400 w-full"
              onClick={onSubmit}
            >
              ต่อไป
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default AddMemberPage;
