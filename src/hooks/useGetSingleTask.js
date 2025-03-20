import axios from "axios";
import { useEffect, useState } from "react";

export default function useGetSingleTask(taskId) {
    const [data, setData] = useState([])

    useEffect(() => {
        if (!taskId) return;

        async function fetchData() {
            try {
                const response = await axios.get(`https://momentum.redberryinternship.ge/api/tasks/${taskId}`,
                    {headers: {Accept: 'application/json', Authorization: "Bearer 9e79c18e-3a48-492c-86a4-6155648b7642"}})
                setData(response.data)
            } catch (error) {
                console.error("Error fetching data: ", error)
            }
        }

        fetchData()
    }, [taskId])

    return (data)
}