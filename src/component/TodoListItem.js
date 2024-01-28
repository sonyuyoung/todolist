// import { FcCheckmark } from "react-icons/fc";
// import { FiCheck } from "react-icons/fi";
// import { MdOutlineIndeterminateCheckBox } from "react-icons/md";

// import styled from "styled-components";
// import React from "react";

// //조건부 렌더링 쉽게 이용하기 위한 도구 가져오기.
// // yarn add classnames : 이미 설치 했음.
// //     "classnames": "^2.3.2",
// import cn from "classnames";

// //내부에서 css 작업
// const TodoListItemCss = styled.div`
//   padding: 1rem;
//   display: flex;
//   align-items: center;
//   /* 짝수 번째 자식 요소의 배경색 지정  & : 현재 본인 요소, div */
//   &:nth-child(even) {
//     background: #f8f9fa;
//   }
// `;

// const CheckboxCss = styled.div`
//   cursor: pointer;
//   /* 차지 할수 있는 영역 모두 차지 ,  */
//   flex: 1;
//   display: flex;
//   align-items: center;

//   svg {
//     font-size: 1.5rem;
//   }

//   .text {
//     margin-left: 0.5rem;
//     flex: 1;
//   }

//   &.checked {
//     svg {
//       color: #999999;
//     }
//     .text {
//       color: #adb5bd;
//       text-decoration: line-through;
//     }
//   }
// `;
// const TextCss = styled.div`
//   margin-left: 1.5rem;
//   flex: 1;
//   /* ${({ checked }) => checked && "text-decoration: line-through;"} */
// `;

// const RemoveCss = styled.div`
//   display: flex;
//   align-items: center;
//   font-size: 1.5rem;
//   color: #ff6b6b;
//   cursor: pointer;
//   &:hover {
//     color: #ff8787;
//   }
// `;
// const DateCss = styled.div`
//   font-size: 14px;
//   color: grey;
// `;

// // 부모 컴포넌트에서 (TodoList)에서 전달받은값
// //<TodoListItem todo={todos} key={todos.id} />
// // todo ={id:1 , text:"내용", checked:true}
// //<TodoListItem todo={todo} key={todo.id} onRemove={onRemove} />
// const TodoListItem = ({ todo, onRemove, onToggle }) => {
//   // 비구조화 할당 = 한거번에 정의함  id, text, checked
//   const { id, text, checked } = todo;

//   return (
//     <TodoListItemCss>
//       {/* 삭제를 하려면 , 그요소를 선택하기 전에 어느요소를
//     삭제할건지 시스템에 알려줘야함
//     todo id=1 , id :id=2 */}

//       {/* cn 이용하면, checkbox라는 속성이  checked 의 속성에 의해서
//       true 이면 , className에 등록이 되고,
//       false 이면 , className에 등록이 안됨,  */}

//       {/* 체크하는 함수 적용하기  */}
//       <CheckboxCss
//         className={cn("checkbox", { checked })}
//         onClick={() => onToggle(id)}
//       >
//         {/* 체크박스의 상태를 표시하는 checked 변수를 기준으로,
//         조건이 true : FiCheck 를 사용하고
//         조건이 false : FcCheckmark 를 사용하기 */}
//         {/* 조건부 렌더링 cn 이용해서 하기.  */}
//         {checked ? <FiCheck /> : <FcCheckmark />}
//         {/* 조건이 true : FiCheck 를 사용하고  */}
//         {/* 더미데이터 내용중 text 가져오기 */}
//         {/* <TextCss>샘플 할일</TextCss> */}
//         <TextCss className="text">{text}</TextCss>
//       </CheckboxCss>
//       {/* <CheckBox>{}</CheckBox> */}

//       <DateCss>{new Date().toLocaleDateString()}</DateCss>
//       <RemoveCss onClick={() => onRemove(id)}>
//         <MdOutlineIndeterminateCheckBox />
//       </RemoveCss>
//     </TodoListItemCss>
//   );
// };

// // 맨 마지막에서 , 디폴트 부분 React.memo 적용해서 1차 성능개선 확인
// export default React.memo(TodoListItem);

import { FcCheckmark } from "react-icons/fc";
import { FiCheck } from "react-icons/fi";
import { MdOutlineIndeterminateCheckBox } from "react-icons/md";

import styled from "styled-components";
import React from "react";

//조건부 렌더링 쉽게 이용하기 위한 도구 가져오기.
// yarn add classnames : 이미 설치 했음.
//     "classnames": "^2.3.2",
import cn from "classnames";

//내부에서 css 작업
const TodoListItemCss = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  /* 짝수 번째 자식 요소의 배경색 지정  & : 현재 본인 요소, div */
  &:nth-child(even) {
    background: #f8f9fa;
  }
`;

const CheckboxCss = styled.div`
  cursor: pointer;
  /* 차지 할수 있는 영역 모두 차지 ,  */
  flex: 1;
  display: flex;
  align-items: center;

  svg {
    font-size: 1.5rem;
  }

  .text {
    margin-left: 0.5rem;
    flex: 1;
  }

  &.checked {
    svg {
      color: #999999;
    }
    .text {
      color: #adb5bd;
      text-decoration: line-through;
    }
  }
`;
const TextCss = styled.div`
  margin-left: 1.5rem;
  flex: 1;
  /* ${({ checked }) => checked && "text-decoration: line-through;"} */
`;

const RemoveCss = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  color: #ff6b6b;
  cursor: pointer;
  &:hover {
    color: #ff8787;
  }
`;
const DateCss = styled.div`
  font-size: 14px;
  color: grey;
`;

const Listvirtualized = styled.div`
  /* 각 목록요소가 출력이 될때, 구분선 넣기 */
  & + & {
    border-top: 1px solid #dee2e6;
  }
  &:nth-child(even) {
    background: #f8f9fa;
  }
`;

// 부모 컴포넌트에서 (TodoList)에서 전달받은값
//<TodoListItem todo={todos} key={todos.id} />
// todo ={id:1 , text:"내용", checked:true}
//<TodoListItem todo={todo} key={todo.id} onRemove={onRemove} />
const TodoListItem = ({ todo, onRemove, onToggle, style }) => {
  // 비구조화 할당 = 한거번에 정의함  id, text, checked
  const { id, text, checked } = todo;

  return (
    <Listvirtualized className="TodoListItem-virtualized" style={style}>
      <TodoListItemCss>
        <CheckboxCss
          className={cn("checkbox", { checked })}
          onClick={() => onToggle(id)}
        >
          {/* 체크박스의 상태를 표시하는 checked 변수를 기준으로, 
        조건이 true : FiCheck 를 사용하고 
        조건이 false : FcCheckmark 를 사용하기 */}
          {/* 조건부 렌더링 cn 이용해서 하기.  */}
          {checked ? <FiCheck /> : <FcCheckmark />}
          {/* 조건이 true : FiCheck 를 사용하고  */}
          {/* 더미데이터 내용중 text 가져오기 */}
          {/* <TextCss>샘플 할일</TextCss> */}
          <TextCss className="text">{text}</TextCss>
        </CheckboxCss>
        {/* <CheckBox>{}</CheckBox> */}

        <DateCss>{new Date().toLocaleDateString()}</DateCss>
        <RemoveCss onClick={() => onRemove(id)}>
          <MdOutlineIndeterminateCheckBox />
        </RemoveCss>
      </TodoListItemCss>
    </Listvirtualized>
  );
};

// 맨 마지막에서 , 디폴트 부분 React.memo 적용해서 1차 성능개선 확인
export default React.memo(TodoListItem);
