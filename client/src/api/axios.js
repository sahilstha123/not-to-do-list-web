import axios from "axios"
const apiEndPoint = import.meta.env.PROD ? "/api/v1/tasks" : "http://localhost:8001/api/v1/tasks"

const apiProcessor = async ({ method, url, data }) => {
    try {
        const response = await axios({
            method,
            url,
            data
        })
        return response.data
    } catch (error) {
        console.error("error", error)
        return {
            success: false,
            message: error?.response?.data?.message || error.message || "Something went wrong",
            error: error?.response?.data?.errors || null
        }
    }
}
export const postTask = async (data) => {

    return apiProcessor({
        method: "post",
        url: apiEndPoint,
        data
    })
}

export const fetchAllTasks = async () => {
    return apiProcessor({
        method: "get",
        url: apiEndPoint
    })
}

export const updateTask = async (id, data) => {

    return apiProcessor({
        method: "patch",
        url: `${apiEndPoint}/${id}`,
        data

    })
}

export const deleteTask = async (ids) => {

    return apiProcessor({
        method: "delete",
        url: apiEndPoint,
        data: ids
    })
}