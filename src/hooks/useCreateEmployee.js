import axios from "axios"

export default function useCreateEmployee() {

    async function createEmployee(formData) {
        const options = {
            method: "POST",
            url: "https://momentum.redberryinternship.ge/api/employees",
            headers: {
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer 9e766a7c-d553-4055-8572-c282604a14fd"
            },
            data: formData,
          };

          try {
            const response = await axios.request(options)
            return response.data;
          } catch (error) {
            console.error("Error creating employee: ", error)
          }
    }

    return { createEmployee };
}