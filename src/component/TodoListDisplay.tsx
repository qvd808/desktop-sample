import React from "react"
import { TodoObject } from "../App"

declare interface TodoListDisplayProps {
    list: Array<TodoObject>
}

export default function TodoListDisplay(props: TodoListDisplayProps) {
    const [checked, setChecked] = React.useState(false);

    return (
      <div>
        {props.list
          ? props.list.map((todo) => (
              <div>
                <input
                  className=""
                  checked={checked}
                  onChange={() => {
                    setChecked(!checked);
                    todo.isDone = !todo.isDone;
                    todo.priority += 1;
                    console.log(todo.isDone);
                  }}
                />
                <p className="">{todo.job}</p>
              </div>
            ))
          : null}
      </div>
    );
}