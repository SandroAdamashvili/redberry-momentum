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
                    Authorization: "Bearer 9e69f803-b6e5-4eea-9055-26904f2ed4a1"
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