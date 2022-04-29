
import {createSlice} from "@reduxjs/toolkit";

let nextTodoId = 0;

const todoSlice = createSlice({
    name: 'todos',
    initialState: [],
    reducers: {
        addTodo(state, action) {
            state.push({ id: nextTodoId++, text: action.payload, completed: false })
        },
        toggleTodo(state, action) {
            const todo = state.map(todo => todo.text === action.payload ? 1 : 0)
            //console.log(state.map(item => item.id));
            console.log(todo)
            if (todo) {
                todo.completed = !todo.completed
            }
        },
    }
})


export const {addTodo,toggleTodo} = todoSlice.actions

export default todoSlice.reducer
