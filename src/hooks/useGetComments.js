import axios from "axios";
import { useEffect, useState } from "react";

export default function useGetSingleTask(taskId) {
    const [data, setData] = useState([])

    useEffect(() => {
        if (!taskId) return;

        async function fetchData() {
            try {
                const response = await axios.get(`https://momentum.redberryinternship.ge/api/tasks/${taskId}/comments`,
                    {headers: {Accept: 'application/json', Authorization: "Bearer 9e766a7c-d553-4055-8572-c282604a14fd"}})
                setData(response.data)
            } catch (error) {
                console.error("Error fetching data: ", error)
            }
        }

        fetchData()
    }, [taskId])

    return [data, setData]
}