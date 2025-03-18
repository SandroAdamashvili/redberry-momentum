import axios from "axios"

export default function useCreateTask() {
    async function createTask(data) {
          try {
            const response = await axios.post(
                "https://momentum.redberryinternship.ge/api/tasks",
                data,
                {
                    headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer 9e766a7c-d553-4055-8572-c282604a14fd"
                    }
                }
            )
            return response.data;
          } catch (error) {
            console.error("Error creating employee: ", error)
          }
    }

    return { createTask };
}