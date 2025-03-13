import axios from "axios";
import { useEffect, useState } from "react";

const options = {
    method: 'GET',
    url: 'https://momentum.redberryinternship.ge/api/tasks',
    headers: {Accept: 'application/json', Authorization: "Bearer 9e69f803-b6e5-4eea-9055-26904f2ed4a1"}
  };

export default function useGetSingleTask(taskId) {
    const [data, setData] = useState([])

    useEffect(() => {
        if (!taskId) return;

        async function fetchData() {
            try {
                const response = await axios.get(`https://momentum.redberryinternship.ge/api/tasks/${taskId}`,
                    {headers: {Accept: 'application/json', Authorization: "Bearer 9e69f803-b6e5-4eea-9055-26904f2ed4a1"}})
                setData(response.data)
            } catch (error) {
                console.error("Error fetching data: ", error)
            }
        }

        fetchData()
    }, [taskId])

    return { data }
}