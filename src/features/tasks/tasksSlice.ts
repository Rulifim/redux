import {createSlice} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { loadDemo } from './taskThunk';

export type Task = {
    id: string;
    title: string;
    done: boolean;

    
};
type TasksState = {items:Task[], status: 
    |'idle'
    |'loading'
    |'succeeded'
    |'failed'
    eror:|null;};
const initialState: TasksState = { items:[], status:'idle',eror:null};
const taskSlice = createSlice({
    name:'tasks',
    initialState,
    reducers:{
        added(state,action:PayloadAction<Task>){
            state.items.push(action.payload);
        },
        toggled(state,action:PayloadAction<string>){
            const task = state.items.find(
                item => item.id == action.payload
            );
        if (task) task.done = !task.done;
        },
        removed(state,action:PayloadAction<string>){
            state.items = state.items.filter(
                item => item.id == action.payload
                
            );
        }
    },
});
export const {added,toggled} = taskSlice.actions;
export default taskSlice.reducer;

extraReducers:builder =>{
    builder
    .addCase(loadDemo.pending, state => {
        state.status = 'loading';
        state.error = null;
    })
    .addCase(loadDemo.fulfilled,(state,action)=>{
        state.status = 'succeeded'
        state.items = action.payload
    })
    .addCase(loadDemo.rejected,(state,action)=>{
        state.status = 'failed'
        state.error = action.payload??
        action.error.message??'Неизвестная ошибка';
        
    })
}

// try{
//     const tasks = await dispatch(loadDemo(false)).unwrap()
//     console.log('Получено',tasks.length)
// }catch (error){
//     console.log('Операция завершилась ошибкой',error)
// }
