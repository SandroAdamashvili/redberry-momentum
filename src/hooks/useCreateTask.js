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
                    Authorization: "Bearer 9e79c18e-3a48-492c-86a4-6155648b7642"
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