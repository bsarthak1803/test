import { useReducer } from 'react'
const initial_state = 0;
//define reducer takes state and action
const reducer = (state, action) => {
    switch(action){
        case 'increment':
            return state+1
        case 'decrement':
            return state-1
        case 'reset':
            return initial_state
        default:
            return state
    }
}


function App2(){
    //just like useState
    const [count, dispatch] = useReducer(reducer, initial_state);
    return (
        <div>
            <div>Count - {count}</div>
            <button onClick = { () => dispatch('increment')}>increment</button>
            <button onClick = { () => dispatch('decrement')}>decrement</button>
            <button onClick = { () => dispatch('reset')}>reset</button>
        </div>
    )
}

export default App2