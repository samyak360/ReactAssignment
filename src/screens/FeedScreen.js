import React, { useState, useEffect, useRef } from "react";
import "../index.scss";
import { toggle, calender, item, onboard } from "../images/index";
import { BsLightningChargeFill } from "react-icons/bs";
import { AiOutlineSetting } from "react-icons/ai";
import { IoSend } from "react-icons/io5";
import { MdKeyboardArrowUp, MdOutlineMailOutline } from "react-icons/md";
import { BiUserCircle } from "react-icons/bi"
import { HiOutlineArchive } from "react-icons/hi"
import { MdKeyboardArrowDown } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  updateActiveUser,
  updateChats,
  updateCurrentUser,
  updateFirstTimeChat,
} from "../redux/action";

export default function Index() {
  const dispatch = useDispatch();

  const bottomRef = useRef(null);

  const [isActive, setActive] = useState(false);
  const [newMessage, setNewMessage] = useState(false);

  const myFunction = () => {
    if (!isActive) setActive(true);
    else setActive(false);
  };

  const [toggleActiveConversations, setToggleActiveConversations] =
    useState(true);

  const [inputMessage, setInputMessage] = useState("");

  const { users, activeUser, currentUser, chats } = useSelector(
    (state) => state
  );

  const changeActiveUser = (index) => {
    dispatch(updateActiveUser(index));
  };

  const changeCurrentUser = (index) => {
    dispatch(updateCurrentUser(index));
  };

  const [currentChat, setCurrentChat] = useState([]);

  const [currentChatId, setCurrentChatId] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    setInputMessage("");
    dispatch(updateChats(currentUser.chatId + inputMessage));
    if (newMessage)
      setNewMessage(false);
    else
      setNewMessage(true)
  };

  useEffect(() => {
    setActive(false);

    setCurrentChatId(
      currentUser.chatId + "-" + activeUser.chatId + "-" + currentUser.chatId
    );
    if (chats[currentChatId.slice(0, 5)]?.length) {
      setCurrentChat(chats[currentChatId.slice(0, 5)]);
    } else if (chats[currentChatId.slice(3)]) {
      setCurrentChat(chats[currentChatId.slice(3)]);
    } else {
      dispatch(updateFirstTimeChat(currentChatId.slice(0, 5)));
      setCurrentChat(chats[currentChatId.slice(0, 5)]);
    }

    bottomRef.current.scrollIntoView();

  }, [currentUser.chatId, activeUser.chatId, currentChatId, chats, dispatch, newMessage]);

  return (
    <div className="chat-assignment">
      <div className="overlay">
        <div className="left">
          <div className="heading">
            <h2>
              <div className="icon">
                <BsLightningChargeFill color="blue" />
              </div>
              <p>QuickChat</p>
            </h2>
            <div className="profile-section">
              <img src={currentUser.avatar} alt="" />
              <div className="name">
                {currentUser.name}&nbsp;
                <div className="dropdown">
                  <AiOutlineSetting
                    className="option-icon"
                    onClick={myFunction}
                  />
                  <div className={`dropdown-content ${isActive ? "show" : ""}`}>
                    <p style={{ fontSize: "12px", paddingTop: "10px", paddingLeft: "5px" }}>
                      Change current user:
                    </p>
                    {users.map((user, index) => {
                      return (user.name !== currentUser.name) &&
                        (
                          <p
                            key={index}
                            className="user"
                            onClick={() => changeCurrentUser(index)}
                          >
                            {user.name}
                          </p>
                        );
                    })}
                  </div>
                </div>
              </div>

              <div className="designation">Lead UI/UX designer</div>
              <div className="active-button">
                <img src={toggle} alt="" />
                Active
              </div>
            </div>
            <div className="active-conservation">
              <div
                className="heading"
                onClick={() => {
                  setToggleActiveConversations(!toggleActiveConversations);
                }}
              >
                <h5>Active Conversations</h5>
                {toggleActiveConversations ? (
                  <MdKeyboardArrowUp />
                ) : (
                  <MdKeyboardArrowDown />
                )}
              </div>
              <div className="conversations">
                {toggleActiveConversations &&
                  users?.map((user, index) => {
                    return (
                      currentUser.name !== user.name && (
                        <li
                          key={index}
                          className={`user ${activeUser.name === user.name ? "active" : ""
                            }`}
                          onClick={() => {
                            changeActiveUser(index);
                          }}
                        >
                          <img src={user.avatar} alt="" />
                          <p>{user.name}</p>
                        </li>
                      )
                    );
                  })}
              </div>
            </div>
            <div className="archived-conservation">
              <div className="heading">
                <h5>
                  Archived Conversations{" "}
                  <MdKeyboardArrowDown style={{ float: "right" }} />
                </h5>
              </div>
            </div>
          </div>
        </div>
        <div className="middle">
          <div className="chat-section">
            {currentChat?.map((chat, index) => {
              return (
                <li key={index}>
                  <div
                    className={`${currentUser.chatId === chat.slice(0, 2)
                      ? "message-right"
                      : "message-left"
                      }`}
                  >
                    <img
                      src={`${currentUser.chatId === chat.slice(0, 2)
                        ? currentUser.avatar
                        : activeUser.avatar
                        }`}
                      alt=""
                    />
                    &nbsp;&nbsp;
                    <span className="message"> {chat.slice(2)}</span>
                  </div>
                </li>
              );
            })}
            <div ref={bottomRef}></div>
          </div>
          <div className="send-message-section">
            <form onSubmit={submitHandler}>
              <input
                type="text"
                placeholder="Enter your message here"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
              />
              <button type="submit">
                Send&nbsp;&nbsp;
                <span>
                  <IoSend />
                </span>
              </button>
            </form>
          </div>
        </div>
        <div className="right">
          <div className="profile-section">
            <img src={activeUser.avatar} alt="" />
            <div className="email">
              <MdOutlineMailOutline style={{ fontSize: "16px" }} />&nbsp;&nbsp;<span>{(activeUser.name).slice(0, 5)}@gmail.com</span>
            </div>
            <div className="other-name">
              <BiUserCircle style={{ fontSize: "16px" }} />&nbsp;&nbsp;<span>{activeUser.name}</span>
            </div>
            <button className="archivebtn"> <span>Archive</span>&nbsp;&nbsp;<span><HiOutlineArchive style={{ fontSize: "14px" }} /></span> </button>
          </div>

          <div className="activity">
            <div className="part1">
              <div className="item1"><img src={item} alt="" /></div>
              <div className="item2"><img src={item} alt="" /></div>
              <div className="item3"><img src={item} alt="" /></div>
              <div className="item4"><img src={item} alt="" /></div>
            </div>
            <div className="part2">
              <img src={calender} alt="" />
            </div>
          </div>
          <div className="last">
            <div className="shiftup">
              <img src={onboard} alt="" />
              <h5>Onboard clients</h5>
            </div>
            <p>Share the link with prospects and discuss all stuff</p>
          </div>
        </div>
      </div>
    </div>
  );
}
