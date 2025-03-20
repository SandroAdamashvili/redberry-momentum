import axios from "axios"

export default function useChangeStatus() {
    async function changeStatus(taskId, status) {
        const options = {
            method: "PUT",
            url: `https://momentum.redberryinternship.ge/api/tasks/${taskId}`,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer 9e79c18e-3a48-492c-86a4-6155648b7642"
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