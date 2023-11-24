import React, { useState, useEffect } from "react";
import CateTemplate from "../../component/category/CateTemplate";
import CateInsert from "../../component/category/CateInsert";
import TodoList from "../../component/category/CateList";
import AxiosApi from "../../api/AxiosApi";
import Modal from "../../utils/Modal";

const Category = () => {
  const [todos, setTodos] = useState([]);
  const email = window.localStorage.getItem("email");

  const [modalOpen, setModalOpen] = useState(false);
  const [modlaMessage, setModalMessage] = useState("");
  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const todoList = async () => {
      const rsp = await AxiosApi.cateList();
      if (rsp.status === 200) setTodos(rsp.data);
      console.log(rsp.data);
    };
    todoList();
  }, []);

  const onInsert = async (text) => {
    console.log("onInsert : " + text + " " + email);
    const rsp = await AxiosApi.cateInsert(email, text);
    if (rsp.data === true) {
      const rsp = await AxiosApi.cateList();
      if (rsp.status === 200) setTodos(rsp.data);
      console.log(rsp.data);
    } else {
      setModalOpen(true);
      setModalMessage("등록 실패");
    }
  };

  const onRemove = async (id) => {
    const rsp = await AxiosApi.cateDelete(id);
    if (rsp.data === true) {
      const rsp = await AxiosApi.cateList();
      if (rsp.status === 200) setTodos(rsp.data);
      console.log(rsp.data);
    } else {
      setModalOpen(true);
      setModalMessage("삭제 실패");
    }
  };

  // const onToggle = async (id) => {
  //   const rsp = await AxiosApi.todoUpdate(id);
  //   if (rsp.data === true) {
  //     const rsp = await AxiosApi.todoList(userId);
  //     if (rsp.status === 200) setTodos(rsp.data);
  //     console.log(rsp.data);
  //   } else {
  //     setModalOpen(true);
  //     setModalMessage("수정 실패");
  //   }
  // };

  return (
    <CateTemplate>
      <CateInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} />
      <Modal open={modalOpen} close={closeModal} header="오류">
        {modlaMessage}
      </Modal>
    </CateTemplate>
  );
};
export default Category;
