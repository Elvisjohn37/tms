import { useState, useRef } from 'react'
import styles from './Task.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import { addTask } from './task/slice'
import { addToLocalStorage } from './task/localStorage'

const Task = ({ data }) => {
    const dispatch = useDispatch()
    const title = useRef('')

    const [visibleForms, setVisibleForms] = useState({
        backlog: false,
        readyToDo: false,
        inProgress: false,
        done: false,
    })

    const handleAddTask = () => {
        setVisibleForms({ ...visibleForms, [data.status]: true })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const newTask = {
            title: title.current,
            date: `${new Date().toDateString()} ${new Date().toLocaleTimeString()}`,
        }
        addToStore(newTask)
        addToLocalStorage(data.status, newTask)
    }

    const addToStore = (newTask) => {
        event.preventDefault()
        dispatch(
            addTask({
                status: data.status,
                task: newTask,
            })
        )
        resetField()
        title.current = ''
    }

    const resetField = () => {
        setVisibleForms({ ...visibleForms, [data.status]: false })
    }

    const handleCancel = () => {
        resetField()
    }

    const handleDrag = (event) => {
        event.dataTransfer.setData('text', event.target.id)
    }

    const handleDrop = (event) => {
        event.preventDefault()
        const draggedItem = document.getElementById('dragItem')
        event.target.appendChild(draggedItem)
    }

    const handleDragover = (event) => {
        event.preventDefault()
    }

    return (
        <div className={styles.task}>
            <div className={styles.taskTitle}>{data.label}</div>
            <div className={styles.addButton}>
                <FontAwesomeIcon icon={faPlus} onClick={handleAddTask} />
                {visibleForms[data.status] && (
                    <div className={styles.createNewTask}>
                        <form onSubmit={handleSubmit}>
                            <div className={styles.formGroup}>
                                <label>title:</label>
                                <input
                                    autoFocus
                                    required
                                    onChange={(event) =>
                                        (title.current = event.target.value)
                                    }
                                />
                                <div className={styles.formOptions}>
                                    <button
                                        onClick={handleCancel}
                                        className={styles.cancel}
                                        type="button"
                                    >
                                        Cancel
                                    </button>
                                    <button className={styles.ok} type="submit">
                                        OK
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                )}
            </div>
            <div
                className={styles.list}
                onDrop={handleDrop}
                onDragOver={handleDragover}
            >
                {data.tasks.map((task) => (
                    <div
                        key={task.id}
                        draggable="true"
                        onDragStart={handleDrag}
                        id="dragItem"
                        className={styles.task}
                    >
                        <div className={styles[data.status]}>
                            <span></span>
                        </div>
                        <div className={styles.title}>{task.title}</div>
                        <div className={styles.date}>{task.date}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Task
