import React, { useEffect, useState } from "react"
import { TodoObject } from "../App"

declare interface TodoListDisplayProps {
    list: Array<TodoObject>
}

export default function TodoListDisplay(props: TodoListDisplayProps) {

    const [state, setState] = useState(0);

    return (
        <div className="relative flex flex-col self-start left-1/4">
            {props.list
                ? props.list.map((todo) => (
                    <label
                        className="inline-flex space-x-3 my-3"
                    >
                        <input
                            type="checkbox"
                            className="form-checkbox w-6 h-6 rounded"
                            checked={todo.isDone}
                            onChange={() => {
                                todo.isDone =!todo.isDone;
                                setState(state + 1);
                                console.log(todo.job)
                            }}
                        />
                        <p className="text-yellow-500 hover:cursor-pointer">{todo.job}</p>
                    </label>
                ))
                : null}
        </div>
    );
}