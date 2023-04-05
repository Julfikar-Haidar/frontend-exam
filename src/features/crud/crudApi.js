import axios from "axios";

export const getplaceholderData = async () => {
    const response = await axios.get("https://jsonplaceholder.typicode.com/users");

    return response.data;
};

export const create = async (data) => {
    const response = await axios.post("https://jsonplaceholder.typicode.com/users", data);

    return response.data;
};

export const editData = async (id, data) => {
    const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, data);

    return response.data;
};

export const deleteData = async (id) => {
    const response = axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);

    return response.data;
};