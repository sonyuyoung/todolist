import React, { useRef, useReducer } from "react";
import styled from "styled-components";
import TodoBase from "./TodoBase";
import TodoInsert from "./TodoInsert";
import TodoList from "./TodoList";
import { useCallback } from "react";

import { useNavigate } from "react-router-dom";

const Main_css = styled.div`
  margin: 0;
  padding: 0;
  background: #ffffff;
`;

const TodoMain = () => {
  const navigate = useNavigate();

  const StyledButton = styled.button`
    /* 여기에 스타일을 추가하세요 */
    background-color: #555; /* 예시 색상 */
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 30px;
    /* 추가적인 스타일 속성들을 필요에 따라 설정하세요 */
  `;
  const nextId = useRef(1);

  // 리듀서 함수 생성
  const todoReducer = (todos, action) => {
    switch (action.type) {
      case "INSERT":
        return todos.concat(action.todo);
      case "REMOVE":
        return todos.filter((todo) => todo.id !== action.id);
      case "TOGGLE":
        return todos.map((todo) =>
          todo.id === action.id ? { ...todo, checked: !todo.checked } : todo
        );
      default:
        return todos;
    }
  };

  // 기존에 더미 데이터를 만드는 부분이 있어서 위에 주석처리하기 ..
  // const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos);
  const [todos, dispatch] = useReducer(todoReducer, []);
  //TodoMain -> TodoInsert 자식 컴포넌트에게 props 함수를 전달하기
  //onInsert 라는 함수는 onChage와는 다르게 매번 새로운 함수를 생성
  //이유는 함수안에 배열이 변경이 되어서
  //todos 배열의 변경에따라서 동작하게 만들기
  const onInsert = useCallback(
    (text) => {
      const todo = {
        //  const nextId = useRef(4); 4부터 할당.
        id: nextId.current,
        text,
        //기본값
        checked: false,
      };

      // setTodos(todos.concat(todo));
      // nextId.current += 1;
      // 성능개선 2번째 / 주석
      // setTodos((todos) => todos.concat(todo));

      // 성능개선 3번째 dispatch 함수호출
      dispatch({ type: "INSERT", todo }, []);
      nextId.current += 1;
    },
    // [todos]
    // 성능 개선 2번째,  의존성 배열 부분 비우기.
    []
  );

  const onToggle = useCallback(
    (id) => {
      // setTodos(
      // todos.map((todo) =>
      //   todo.id === id ? { ...todo, checked: !todo.checked } : todo
      //   (todos) =>
      //     todos.map((todo) =>
      //       todo.id === id ? { ...todo, checked: !todo.checked } : todo
      //     )
      // );
      // 3) dispatch 함수를 호출.
      dispatch({ type: "TOGGLE", id });
    },
    // [todos]
    // 의존성 배열 없이 동작.
    []
  );
  // 지우기 기능 함수 추가 !
  // 데이터 추가시 : 내장함수 , concat 이용해서 , 새로운배열을 생성했었음
  // 데이터 삭제시 : 내장함수 , filter 이용해서, 새로운 배열생성 .
  // 콜백함수 : 조건일치하는 요소만 뽑아서 새로 생성함 ???
  // 선택한 아이디가 같지 않다면 참 이라 뽑아내고
  // 같다면 삭제
  const onRemove = useCallback(
    (id) => {
      // setTodos(todos.filter((todo) => todo.id !== id));
      // 성능개선 2번째 : 함수형태로 변경하고 ,의존성배열에서, todos참조안하기
      // 결론, 새롭게 매번 함수생성을 안함
      // setTodos(todos.filter((todo) => todo.id !== id));
      // dispatch({ type: "REMOVE", todo }, []);
      // 3) dispatch 함수를 호출.
      dispatch({ type: "REMOVE", id });
    },
    // [todos]
    // 성능개선 2번째, 의존성 배열 없애기.
    []
  );

  return (
    <Main_css>
      <TodoBase>
        <TodoInsert onInsert={onInsert} />
        {/* 부모(TodoMain)에서 세터 , 자식(ToDoList)에서 게터 /   */}
        {/* 위에서 만든 임시 데이터 배열를 전달 : props 속성으로 전달 */}
        {/* 제거하는 함수를 props를 이용해서 전달 !  */}
        <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
      </TodoBase>
      <StyledButton onClick={() => navigate("/")}>
        다른디자인 보러가기
      </StyledButton>
    </Main_css>
  );
};

export default TodoMain;
