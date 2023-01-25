import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import TodoListDisplay from "./component/TodoListDisplay";

export interface TodoObject {
  job: string
  priority: number
  isDone: boolean
  remind: () => void;
}


function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [todoInput, setToDoInput] = useState("");
  const [toDoList, setToDoList] = useState(Array<TodoObject>);

  async function send_notificaiton(title:String , body:String) {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
      await invoke("send_notificaiton", {title: title, body: body})
    }

  return (
    <div className="bg-red">
      <h1 className="text-3xl font- ">Enter Todo Jobs!</h1>

      <input
        id="greet-input"
        onChange={(e) => setToDoInput(e.currentTarget.value)}
        value={todoInput}
        placeholder="Enter something ..."
      />
      <button
        type="button"
        onClick={() => {
          // send_notificaiton();
          const delay = 1000;
          const newTodoObject: TodoObject = {
            job: todoInput,
            isDone: false,
            priority: 0,
            remind: () => {
              let timerId = setTimeout(function tick() {
                if (!newTodoObject.isDone) {
                  send_notificaiton(
                    "You have not finished your job!!",
                    todoInput
                  );
                  timerId = setTimeout(tick, 1000);
                } else {
                  clearInterval(timerId);
                }
              }, 1000);
            },
          };
          newTodoObject.remind();
          setToDoList((toDoList) => [...toDoList, newTodoObject]);
          setToDoInput("");
        }}
      >
        Submit
      </button>
      <TodoListDisplay list={toDoList} />
    </div>
  );
}

export default App;
