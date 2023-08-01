import { Route, Router, Routes, useNavigate } from "react-router-dom";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { authState } from "./store/authState";
import { useEffect } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import TodoList from "./components/TodoList";

function App() {
  return (
    <>
      <RecoilRoot>
        <Router>
          <InitState />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/todos" element={<TodoList />} />
          </Routes>
        </Router>
      </RecoilRoot>
    </>
  );
}

function InitState() {
  const setAuth = useSetRecoilState(authState);
  const navigate = useNavigate();
  const init = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:3000/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.username) {
        setAuth({ token: data.token, username: data.username });
        navigate("/todos");
      } else {
        navigate("/login");
      }
    } catch (error) {
      navigate("/login");
    }
  };
  useEffect(() => {
    init();
  }, []);
  return <></>;
}

export default App;
