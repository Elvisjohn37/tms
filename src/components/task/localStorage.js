const addToLocalStorage = (status, newTask) => {
    const datas = JSON.parse(localStorage.getItem('datas'))

    const newId = datas.find((data) => data.status === status).tasks.length + 1

    localStorage.setItem(
        'datas',
        JSON.stringify(
            datas.map((data) => {
                if (data.status === status) {
                    data.tasks = [...data.tasks, { id: newId, ...newTask }]
                }
                return data
            })
        )
    )
}

export { addToLocalStorage }
