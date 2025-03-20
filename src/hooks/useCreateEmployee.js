import axios from "axios"

export default function useCreateEmployee() {

    async function createEmployee(formData) {
        const options = {
            method: "POST",
            url: "https://momentum.redberryinternship.ge/api/employees",
            headers: {
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer 9e79c18e-3a48-492c-86a4-6155648b7642"
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