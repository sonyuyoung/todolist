import "./App.css";
import TodoMain from "./component/TodoMain";
import TodolistFirst from "./component/TodolistFirst";
// 페이지 이동을 위한 설정 1
import { BrowserRouter, Routes, Route } from "react-router-dom";

// npm install react-icons

function App() {
  // 컴포넌트를 렌더링
  return (
    <BrowserRouter>
      <Routes>
        {/* 기본 화면으로 TodolistFirst를 렌더링 */}
        <Route path="/" element={<TodolistFirst />} />
        <Route path="todolist" element={<TodoMain />} />
      </Routes>
    </BrowserRouter>
  );
}

// 컴포넌트를 내보냅니다.
export default App;
