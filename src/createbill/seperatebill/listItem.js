import React from "react";
import { useLocation } from "react-router-dom";
import Sheet from "react-modal-sheet";
import styled from "styled-components";
import axios from "axios";
import React, { useState, useEffect, useRef, createRef } from "react";
const ListItem = ({ passedData, passToParent }) => {
  const location = useLocation();
  const groupId = location.state.groupId;
  const list = passedData;

  const [isOpen, setOpen] = useState(false);
  const [memberlist, setMemberlist] = useState([]);

  // ----------check box handling---------------
  const [checked, setChecked] = useState([]);
  const [itemIndex, setItemIndex] = useState();

  //-----------manage member button-------------
  const memberElementsRef = useRef(list.map(() => createRef()));

  useEffect(() => {
    // add property member to item list
    list.forEach(function (e) {
      e.member = [];
    });
    //old pull api
    axios
      .get("https://ab40-161-246-145-247.ap.ngrok.io/v1/group/1234", {
        headers: {
          "ngrok-skip-browser-warning": "3000",
        },
      })
      .then((response) => {
        console.log(response);
        //console.log(response.data[0].user_id);
        setMemberlist(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    // new pull api
    // axios
    //   //.get(`https://meekor.onrender.com/v1/group/${groupId}`, {
    //   .get(`https://meekor.onrender.com/v1/group/${groupId}`, {
    //     headers: {
    //       "ngrok-skip-browser-warning": "3000",
    //     },
    //   })
    //   .then((response) => {
    //     console.log("response");
    //     console.log(response);
    //     setMemberlist(response.data.data);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  }, []);

  // mockData(group members)
  // const checkList = ["Unn", "HB", "Creamder", "gade"];
  // mock all member members data
  /*const memberlist = [
    {
      name: 'un',
      id: '124',
      pic: '/dsfs',
    },
    {
      name: 'HB',
      id: '123',
      pic: '/dsfs',
    },
    {
      name: 'Der',
      id: '234',
      pic: '/dsfs',
    },
    {
      name: 'Gade',
      id: '134',
      pic: '/dsfs',
    },
  ];*/

  const open = (idx) => {
    setOpen(true);
    setItemIndex(idx);
  };
  const close = () => {
    setOpen(false);
    // clear select
    list[itemIndex].member = checked;

    memberChange(itemIndex);

    setChecked([]);
    setItemIndex(null);

    console.log("list with new update ");
    console.log(list);
    passToParent(list);
  };

  // Add/Remove checked item from list
  const handleCheck = (event) => {
    console.log(checkedItems, "------------------------------");
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    console.log("updated list" + updatedList);
    setChecked(updatedList);
  };

  // Generate string of checked items
  const checkedItems = checked.length
    ? checked.reduce((total, item) => {
        return total + ", " + item;
      })
    : "";

  var isChecked = (item) =>
    checked.includes(item) ? "checked-item" : "not-checked-item";

  const onSubmit = () => {
    console.log(checkedItems);
  };
  // ----------end of checkbox handling---------

  //Display member UI according to change
  const memberChange = (index) => {
    console.log(memberElementsRef.current[index].current);

    //clear old member list of that item
    memberElementsRef.current[index].current.innerHTML = null;
    //map updated member to div
    list[index].member.map((lm) => {
      // create button -> <button class="p-3 bg-pink-300 rounded-full m-1">{lm}</button>;
      const memberBtn = document.createElement("button");
      memberBtn.className = "p-3 bg-pink-300 rounded-full m-1";
      memberBtn.innerText = lm;
      //add to that div by useRef
      memberElementsRef.current[index].current.appendChild(memberBtn);
    });
  };

  return (
    <div>
      <span>
        {/* goto each item */}
        {list.map((l, index) => (
          <div class="bg-gray-200 mx-5 mb-2 border-2 border-gray-500">
            <div class="flex w-full">
              <input class="p-2 m-2 w-2/4" value={l.item} />
              <input class="p-2 mr-2 mt-2 mb-2 w-1/4" value={l.price} />
            </div>
            <div class="flex justify-between">
              {/* show member for a list*/}
              <div
                ref={memberElementsRef.current[index]}
                className={`item-member-${index}`}
              >
                {/* {l.member.map((lm) => (
                  <button class="p-3 bg-pink-300 rounded-full m-1">{lm}</button>
                ))} */}
              </div>
              {/* button add member */}
              <button
                class=" p-3 bg-green-300 rounded-full m-1"
                onClick={() => open(index)}
              >
                {" "}
                +{" "}
              </button>
            </div>
          </div>
        ))}
      </span>
      <Sheet
        rootId="root"
        isOpen={isOpen}
        onClose={close}
        snapPoints={[-50, 0.5, 200, 0]}
        initialSnap={2}
      >
        <Sheet.Container>
          <Sheet.Header />

          <Sheet.Content>
            <BoxList>
              {memberlist.map((item, index) => (
                <div key={index}>
                  <input value={item} type="checkbox" onChange={handleCheck} />
                  <span className={isChecked(item)}>{item}</span>
                </div>
              ))}
            </BoxList>
          </Sheet.Content>
        </Sheet.Container>

        <Sheet.Backdrop />
      </Sheet>
    </div>
  );
};
const BoxList = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 16px;
  padding-top: 0px;
  overflow: auto;
`;

const Box = styled.div`
  background-color: #eee;
  border-radius: 12px;
  min-height: 200px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 24px;
`;
export default ListItem;
