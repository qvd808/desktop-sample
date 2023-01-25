import React, { ChangeEvent, FormEvent, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import TodoListDisplay from "./component/TodoListDisplay";

export interface TodoObject {
  job: string;
  priority: number;
  isDone: boolean;
  remind: () => void;
}

const REMIND_TIME = 2.7e6;

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [todoInput, setToDoInput] = useState("");
  const [toDoList, setToDoList] = useState(Array<TodoObject>);

  async function send_notificaiton(title: String, body: String) {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    await invoke("send_notificaiton", { title: title, body: body });
  }

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (todoInput !== "") {
      const newTodoObject: TodoObject = {
        job: todoInput,
        isDone: false,
        priority: 0,
        remind: () => {
          let timerId = setTimeout(function tick() {
            if (!newTodoObject.isDone) {
              send_notificaiton("You have not finished your job!!", todoInput);
              newTodoObject.priority += 1;
              timerId = setTimeout(tick, 1000);
            } else {
              clearInterval(timerId);
            }
          }, REMIND_TIME);
        },
      };
      newTodoObject.remind();
      setToDoList((toDoList) => [...toDoList, newTodoObject]);
      setToDoInput("");
    }
  };

  return (
    <form
      onSubmit={onFormSubmit}
      className="flex flex-col justify-center items-center"
    >
      <h1 className="my-10 text-7xl font-roboto font-semibold text-yellow-400">
        Enter Todo Jobs!
      </h1>
      <input
        className="h-8 lg:h-12 lg:text-xl border-2 border-red-300 rounded-lg w-1/2 my-8 px-5"
        id="greet-input"
        onChange={(e) => setToDoInput(e.currentTarget.value)}
        value={todoInput}
        placeholder="Enter something ..."
      />
      <button
        type="submit"
        className="h-1/2 w-auto border-2 border-gray-900 border-spacing-5 rounded-xl px-3 py-1 bg-slate-500"
      >
        Submit
      </button>
      <TodoListDisplay list={toDoList} />
    </form>
  );
}

export default App;
