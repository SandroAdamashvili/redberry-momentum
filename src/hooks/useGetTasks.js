import axios from "axios";
import { useEffect, useState } from "react";

const options = {
    method: 'GET',
    url: 'https://momentum.redberryinternship.ge/api/tasks',
    headers: {Accept: 'application/json', Authorization: "Bearer 9e79c18e-3a48-492c-86a4-6155648b7642"}
  };

export default function useGetTasks() {
    const [data, setData] = useState([])

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.request(options)
                setData(response.data)
            } catch (error) {
                console.error("Error fetching data: ", error)
            }
        }

        fetchData()
    }, [])

    return (data)
}