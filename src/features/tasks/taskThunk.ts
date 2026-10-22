import {createAsyncThunk} from'@reduxjs/toolkit'
import type {Task} from './tasksSlice'
export const loadDemo = createAsyncThunk<
Task[],boolean,{rejectValue:string}
>
('tasks/loadDemo',async(shouldFail,{rejectWithValue})=>{
    await new Promise(resolve=>setTimeout(resolve,700))
    if (shouldFail) return rejectWithValue("Не удалось загрузить")
    return[{id:'demo-1',title:"Повторить Redux",done:false}]
})