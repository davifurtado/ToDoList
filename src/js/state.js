import {createStore} from './lib/state';

const initialState = {
    todos: [
        {
            id: 0,
            text: 'Take a look at the application',
            done: true
        },
        {
            id: 1,
            text: 'Add ability to filter todos',
            done: false
        },
        {
            id: 2,
            text: 'Filter todos by status',
            done: false
        },
        {
            id: 3,
            text: 'Filter todos by text',
            done: false
        }
    ]
};

function storeData(state) {
        return localStorage.setItem('toDoList', JSON.stringify(state))
    }

export function readData() {
        const cache = localStorage.getItem('toDoList')

        if (cache) {
            return console.log(JSON.parse(cache))
        }
    }

function todoChangeHandler(state, change) {
    switch(change.type) {
        case 'ADD_TODO':
            state.todos.push({
                id: state.todos.length,
                text: change.text,
                done: false
            });
            break;
        case 'TODO_TOGGLE_DONE':
            for(let todo of state.todos) {
                if(todo.id === change.id) {
                    todo.done = !todo.done;
                    break;
                }
            }
            break;
    }
    storeData(state);
}

export const todos = createStore(todoChangeHandler, initialState);
