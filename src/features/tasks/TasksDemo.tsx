import { useState } from "react";
import { useAppDispatch,useAppSelector } from "../../app/hooks";
import { added,toggled } from "./tasksSlice";
import { loadDemo } from "./taskThunk";

export function TaskDemo(){
    const [title,setTitle] = useState("")
    const items = useAppSelector(s=>s.tasks.items)
    const dispatch = useAppDispatch()
    const status = useAppSelector(state=>state.tasks.status)
    const error = useAppSelector(state=>state.tasks.error)
    return(
          <section>
            <form onSubmit={event => {
                event.preventDefault();

                const value = title.trim();
                if (!value) return;

                dispatch(added({
                    id: crypto.randomUUID(),
                    title: value,
                    done: false,
                }));

                setTitle('');
            }}>
                <label htmlFor="title">Название задачи</label>
                <input
                    id="title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <button type="submit">Добавить</button>
            </form>

            <button
                type="button"
                disabled={status === 'loading'}
                onClick={() => dispatch(loadDemo(false))}
            >
                {status === 'loading'
                    ? 'Загрузка...'
                    : 'Загрузить задачи'}
            </button>

            {status === 'failed' && (
                <div>
                    <p>Ошибка: {error}</p>
                    <button
                        type="button"
                        onClick={() => dispatch(loadDemo(false))}
                    >
                        Повторить
                    </button>
                </div>
            )}

            <ul>
                {items.map(task => (
                    <li key={task.id}>
                        <label>
                            <input
                                type="checkbox"
                                checked={task.done}
                                onChange={() =>
                                    dispatch(toggled(task.id))
                                }
                            />
                            {task.title}
                        </label>
                    </li>
                ))}
            </ul>
        </section>
    );
}

