import axios from "axios"
const apiEndPoint = "http://localhost:8001/api/v1/tasks"
export const postTask = async (data) => {
    try {
        const response = await axios.post(apiEndPoint, data)
        console.log("axios response:", response)
        return response.data
    } catch (error) {
        console.error("axios error:", error.response?.data || error.message)
        // return error object so caller can handle it
        return error.response?.data
    }
}
