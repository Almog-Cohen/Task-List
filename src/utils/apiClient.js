import axios from "axios";

export async function authenticate({ email, password }) {
  const response = await axios.post(
    "https://private-052d6-testapi4528.apiary-mock.com/authenticate",
    {
      email,
      password,
    }
  );
  return response.data[0];
}

export async function getProjectsInfo(token) {
  const response = await axios.get(
    "https://private-052d6-testapi4528.apiary-mock.com/info",
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
}
