import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    datas: [],
}

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        addTask: (state, action) => {
            const newTask = action.payload.task
            state.datas = state.datas.map((data) => {
                if (data.status === action.payload.status) {
                    const newId = parseInt(data.tasks.length) + 1
                    data.tasks = [
                        {
                            id: newId,
                            ...newTask,
                        },
                        ...data.tasks,
                    ]
                }
                return data
            })
        },
        setDatas: (state) => {
            state.datas = JSON.parse(localStorage.getItem('datas'))
        },
    },
})

const getTaskState = (state) => state.task

export const { addTask, setDatas } = taskSlice.actions

export default taskSlice.reducer

export { getTaskState }
