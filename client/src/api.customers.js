import axios from "axios";

export function getAllCustomers() {
	return axios.get(
		"http://localhost:8000/customers/api/customers/?format=json"
	);
}
