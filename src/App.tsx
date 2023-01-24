import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [todoInput, setToDoInput] = useState("Enter something");
  const [toDoList, setToDoList] = useState([]);

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
      invoke("send_notificaiton").then((res) => {
        console.log(res)
      })
    }

  return (
    <div className="container">
      <h1>Welcome to Tauri!</h1>

      <input
        id="greet-input"
        onChange={(e) => setToDoInput(e.currentTarget.value)}
        value={todoInput}
        placeholder="Enter something"
      />
      <button
        type="button"
        onClick={() => {
          const todoValue = todoInput;
          setToDoInput("");
          greet();
        }}
      >
        Greet
      </button>
      <p>{greetMsg}</p>
    </div>
  );
}

export default App;
