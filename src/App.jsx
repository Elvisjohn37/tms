import { useEffect } from 'react'
import styles from './App.module.scss'
import List from './components/Task'
import { useDispatch, useSelector } from 'react-redux'
import { getTaskState, setDatas } from './components/task/slice'

const App = () => {
    const { datas } = useSelector(getTaskState)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!localStorage.getItem('datas')) {
            localStorage.setItem(
                'datas',
                JSON.stringify([
                    {
                        id: '1',
                        status: 'backlog',
                        label: 'Backlog',
                        tasks: [],
                    },
                    {
                        id: '2',
                        status: 'readyToDo',
                        label: 'Ready to do',
                        tasks: [],
                    },
                    {
                        id: '3',
                        status: 'inProgress',
                        label: 'In progress',
                        tasks: [],
                    },
                    {
                        id: '4',
                        status: 'done',
                        label: 'Done',
                        tasks: [],
                    },
                ])
            )
        }
		dispatch(setDatas())
    }, [])

    return (
        <div className={styles.app}>
            {datas.map((data) => (
                <List key={data.id} data={data} />
            ))}
        </div>
    )
}

export default App
