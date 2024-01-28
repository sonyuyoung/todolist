import "./App.css";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { CiSquareCheck } from "react-icons/ci";
// npm install react-icons

function App() {
  // 할일 목록과 순차 번호 상태를 선언합니다.
  const [todoList, setTodoList] = useState([]);
  const [sequance, setSequance] = useState(null);

  // 할일 입력을 위한 ref를 생성합니다.
  const refTodoItem = useRef();

  // 컴포넌트가 처음 렌더링될 때 실행되는 useEffect입니다.
  useEffect(() => {
    // 로컬 스토리지에서 순차 번호를 가져옵니다.
    let sequance = window.localStorage.getItem("sequance");

    // 만약 순차 번호가 없다면 초기값으로 설정하고 로컬 스토리지에 저장합니다.
    if (sequance === null) {
      window.localStorage.setItem("sequance", "0");
      sequance = 0;
    }

    // 초기 할일 목록을 설정합니다.
    const handleSetInit = () => {
      window.localStorage.setItem("todolist", "[]");
      return "[]";
    };

    // 로컬 스토리지에서 할일 목록을 가져오거나 초기값으로 설정합니다.
    let todo = JSON.parse(
      window.localStorage.getItem("todolist") ?? handleSetInit()
    );

    // 할일 목록과 순차 번호 상태를 설정합니다.
    setTodoList(todo);
    setSequance(Number(sequance));
  }, []);

  // 새로운 할일을 추가하는 함수입니다.
  const handleToDoAdd = (item) => {
    // 만약 순차 번호가 없다면 함수를 종료합니다.
    if (sequance === null) {
      return;
    }

    // 할일 목록을 복사하고 새로운 할일을 추가합니다.
    let todo = [...todoList];
    todo.push({ tf: false, id: sequance + 1, text: item });

    // 로컬 스토리지에 할일 목록과 새로운 순차 번호를 저장합니다.
    window.localStorage.setItem("todolist", JSON.stringify(todo));
    window.localStorage.setItem("sequance", String(sequance + 1));

    // 할일 목록과 순차 번호 상태를 업데이트합니다.
    setTodoList(todo);
    setSequance(sequance + 1);

    // 입력 창을 비웁니다.
    refTodoItem.current.value = "";
  };

  // 컴포넌트를 렌더링합니다.
  return (
    <div className="mainLayout">
      <div className="todoLayout">
        <div className="todoTop">
          {/* 할일 목록 제목 */}
          <div className="todoTitle">To Do List</div>
          {/* 할일을 입력하는 부분 */}
          <div className="todoAdd">
            <input
              type="text"
              placeholder="할일을 입력하세요"
              ref={refTodoItem}
            />
            <div onClick={() => handleToDoAdd(refTodoItem.current.value)}>
              +
            </div>
          </div>
        </div>
        {/* 할일 목록을 보여주는 부분 */}
        <div className="listLayout">
          {todoList.map((val, idx) => (
            <div className="todoItem" key={idx}>
              <div className="todoCheckBox">
                {/* 할일이 완료되었을 때 아이콘을 표시합니다. */}
                <div className="checkIcon">{val.tf && <CiSquareCheck />}</div>
                {/* 할일 내용을 표시합니다. */}
                <span>{val.text}</span>
              </div>
              {/* 할일 삭제 버튼 */}
              <div className="deleteBox">x</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 컴포넌트를 내보냅니다.
export default App;
