import axios from "axios"

export default function useChangeStatus() {
    async function changeStatus(taskId, status) {
        const options = {
            method: "PUT",
            url: `https://momentum.redberryinternship.ge/api/tasks/${taskId}`,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer 9e69f803-b6e5-4eea-9055-26904f2ed4a1"
                },
            data: {status_id: status}
        }

          try {
            await axios.request(options)
            // return response.data;
          } catch (error) {
            console.error("Error changing status: ", error)
          }
    }

    return { changeStatus };
}