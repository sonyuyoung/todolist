import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { FcLike } from "react-icons/fc";

const FormCss = styled.form`
  display: flex;
  background: #eeeeee;
`;
const FormInputCss = styled.input`
  background: none;
  outline: none;
  border: none;
  padding: 0.5rem;
  font-size: 1.125rem;
  line-height: 1.5;
  color: #888;
  &::placeholder {
    color: #cccccc;
  }
  flex: 1;
`;
const FormButtonCss = styled.button`
  background: none;
  outline: none;
  border: none;
  background: #555555;
  padding-left: 1rem;
  padding-right: 1rem;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: 0.1s background ease-in;
  &:hover {
    background: blue;
  }
`;
// 부모에서 <TodoInsert onInsert={onInsert} />
const TodoInsert = ({ onInsert }) => {
  // 추가 기능 넣기,
  // 기본 state 이용해서 작업 하기.
  const [value, setValue] = useState("");

  // 함수 생성1번 호출 은 여러번
  // 최초 1회만 해당함수 만듬 (의존성배열 모양.빈배열이라서 onChange 함수 한번만 )
  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  //매번 새로 생성, 호출될때도 새로 호출?
  //onSubmit 이라는 함수를 임의로 만들어서 , 넘어온 함수를 사용학;
  const onSubmit = useCallback(
    (e) => {
      onInsert(value);
      setValue("");
      e.preventDefault(); // Corrected typo: "PreventDefalut" to "preventDefault"
    },
    [onInsert, value]
  );

  // 뭔가 추가를 할때 , 온클릭 이라는 이벤트 핸들러를 추가하고 ,
  // 또한 onKeyPress라는 핸들러도 추가했었음
  // 그런데 onSubmit 속성으로 구성을하면 input 값을 입력후
  // 그냥 엔터를 해도 이벤트 헨들러

  return (
    // 넘어온 함수이벤트 적용
    <FormCss onSubmit={onSubmit}>
      <FormInputCss
        value={value}
        onChange={onChange}
        placeholder="Todo 입력해주세요"
      />
      <FormButtonCss type="submit">
        {/* <GrAdd /> */}
        <FcLike />
      </FormButtonCss>
    </FormCss>
  );
};

export default TodoInsert;
