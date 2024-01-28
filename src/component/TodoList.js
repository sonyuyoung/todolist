import React, { useCallback } from "react";
import { List } from "react-virtualized";
import TodoListItem from "./TodoListItem";

const TodoList = ({ todos, onRemove, onToggle }) => {
  const rowRenderer = useCallback(
    ({ index, key, style }) => {
      const todo = todos[index];
      return (
        <TodoListItem
          todo={todo}
          key={key}
          onRemove={onRemove}
          onToggle={onToggle}
          style={style}
        />
      );
    },
    [onRemove, onToggle, todos]
  );

  return (
    // 부모리스트에서 props로 받아서 ..
    <List
      width={512}
      height={342}
      rowCount={todos.length}
      rowHeight={57}
      rowRenderer={rowRenderer}
      list={todos}
      style={{ outline: "none" }}
    >
      {/* 전달받은 props사용하기  map 이라는 내장 함수를 사용하여 
       Todolist 부모 컴포넌트에 다시 , 자식컴포넌트인 todoitem에게 props로 전달중  todo 속성과 , key 속성 
       부분 스캐너 ?  : 목록요소가 출력시 반드시 keya 명시 */}
      {todos.map((todo) => (
        //TodoMain -> TodoList -> TotoListItem 에게 지우는 기능의 함수를 전달onRemove={onRemove}
        <TodoListItem
          todo={todo}
          key={todo.id}
          onRemove={onRemove}
          onToggle={onToggle}
        />
      ))}
    </List>
  );
};
// 추가
export default React.memo(TodoList);
