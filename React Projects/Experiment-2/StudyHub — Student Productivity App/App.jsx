import { Routes, Route, NavLink, Navigate, useNavigate } from "react-router-dom";
import { useReducer, useState } from "react";
import { useUser } from "./StudentContext";

function Navbar() {
  const { isLoggedIn, setIsLoggedIn } = useUser();
  const navigate = useNavigate();

  function logout() {
    setIsLoggedIn(false);
    navigate("/login");
  }

  return (
    <nav>
      <h2>STUDYHUB</h2>

      <NavLink to="/">Home</NavLink>{" "}
      <NavLink to="/login">Login</NavLink>{" "}
      <NavLink to="/tasks">Tasks</NavLink>{" "}
      <NavLink to="/profile">Profile</NavLink>{" "}

      {isLoggedIn && <button onClick={logout}>Logout</button>}
    </nav>
  );
}

function Home() {
  return (
    <div>
      <h1>Welcome to StudyHub!</h1>
      <p>Log in to manage your daily tasks.</p>
    </div>
  );
}

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { setIsLoggedIn } = useUser();
  const navigate = useNavigate();

  function login(e) {
    e.preventDefault();

    setIsLoggedIn(true);
    navigate("/tasks", { replace: true });
  }

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={login}>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button>Login</button>
      </form>
    </div>
  );
}

const initialTasks = [
  { id: 1, title: "Finish DBMS assignment", completed: false },
  { id: 2, title: "Revise React hooks", completed: false },
  { id: 3, title: "Submit lab report", completed: true }
];

function reducer(state, action) {
  switch (action.type) {
    case "SET_TASKS":
      return action.payload;

    case "ADD_TASK":
      return [
        ...state,
        {
          id: Date.now(),
          title: action.payload,
          completed: false
        }
      ];

    case "TOGGLE_TASK":
      return state.map(task =>
        task.id === action.payload
          ? { ...task, completed: !task.completed }
          : task
      );

    case "DELETE_TASK":
      return state.filter(task => task.id !== action.payload);

    default:
      return state;
  }
}

function Tasks() {
  const [tasks, dispatch] = useReducer(reducer, initialTasks);
  const [text, setText] = useState("");

  function addTask() {
    if (text.trim() === "") return;

    dispatch({
      type: "ADD_TASK",
      payload: text
    });

    setText("");
  }

  return (
    <div>
      <h1>MY TASKS</h1>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="New task"
      />

      <button onClick={addTask}>Add Task</button>

      {tasks.map(task => (
        <div key={task.id}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() =>
              dispatch({
                type: "TOGGLE_TASK",
                payload: task.id
              })
            }
          />

          <span
            style={{
              textDecoration: task.completed
                ? "line-through"
                : "none"
            }}
          >
            {task.title}
          </span>

          <button
            onClick={() =>
              dispatch({
                type: "DELETE_TASK",
                payload: task.id
              })
            }
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

function Profile() {
  const { student } = useUser();

  return (
    <div>
      <h1>Student Details</h1>

      <p>Name: {student.name}</p>
      <p>Email: {student.email}</p>
      <p>Year: {student.year}</p>
    </div>
  );
}

function Protected({ children }) {
  const { isLoggedIn } = useUser();

  return isLoggedIn ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/tasks"
          element={
            <Protected>
              <Tasks />
            </Protected>
          }
        />

        <Route
          path="/profile"
          element={
            <Protected>
              <Profile />
            </Protected>
          }
        />
      </Routes>
    </>
  );
}