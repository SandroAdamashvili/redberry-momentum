import axios from "axios"

export default function useCreateEmployee() {

    async function createEmployee(formData) {
        const options = {
            method: "POST",
            url: "https://momentum.redberryinternship.ge/api/employees",
            headers: {
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer 9e69f803-b6e5-4eea-9055-26904f2ed4a1"
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