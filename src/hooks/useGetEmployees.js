import axios from "axios";
import { useEffect, useState } from "react";

const options = {
    method: 'GET',
    url: 'https://momentum.redberryinternship.ge/api/employees',
    headers: {Accept: 'application/json', Authorization: "Bearer 9e766a7c-d553-4055-8572-c282604a14fd"}
  };

export default function useGetEmployees() {
    const [data, setData] = useState([])

    async function fetchData() {
        try {
            const response = await axios.request(options)
            return response.data
        } catch (error) {
            console.error("Error fetching data: ", error)
        }
    }

    useEffect(() => {
        async function fetchEmployees() {
            const response = await fetchData();
            setData(response)
        }
        fetchEmployees()
    }, [])

    return {data, setData, fetchData}
}