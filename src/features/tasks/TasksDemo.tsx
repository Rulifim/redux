import { useState } from "react";
import { useAppDispatch,useAppSelector } from "../../app/hooks";
import { added,toggled } from "./tasksSlice";

export function TaskDemo(){
    const [title,setTitle] = useState("")
    const items = useAppSelector(s=>s.tasks.items)
    const dispatch = useAppDispatch()
    return(
        <section>
            <form onSubmit={event =>{
                event.preventDefault()
                const value = title.trim()
                if(!value) return
                dispatch(added({
                    id: crypto.randomUUID(),
                    title:value,
                    done:false,
                }))
                setTitle("")
            }}>
                <label htmlFor="title">Название задачи</label>
                <input id= "title" value={title} onChange={e=> setTitle(e.target.value)}/>
                <button type="submit">Добавить</button>
            </form>
            <ul>{items.map(task=>(
                <li key={task.id}>
                    <label >
                        <input type="checkbox" checked={task.done} onChange={()=>dispatch(toggled(task.id))}/>
                        {task.title}
                    </label>
                </li>
            ))}</ul>
        </section>
    )
}   