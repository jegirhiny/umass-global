import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class JoblyApi {
  static token;

  static async request(endpoint, data = {}, method = "get") {
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = method === "get" ? data : {};

    try {
      const response = await axios({ url, method, data, params, headers });
      return response.data;
    } catch (err) {
      console.error("API Error:", err.response);
      const message = err.response?.data?.error?.message || "Unknown error";
      throw Array.isArray(message) ? message : [message];
    }
  }

  static async getCompanies(name) {
    const { companies } = await this.request("companies", { name });
    return companies;
  }

  static async getCompany(handle) {
    const { company } = await this.request(`companies/${handle}`);
    return company;
  }

  static async getJobs(title) {
    const { jobs } = await this.request("jobs", { title });
    return jobs;
  }

  static async signup(data) {
    const { token } = await this.request("auth/register", data, "post");
    return token;
  }

  static async login(data) {
    const { token } = await this.request("auth/token", data, "post");
    return token;
  }

  static async getCurrentUser(username) {
    const { user } = await this.request(`users/${username}`);
    return user;
  }

  static async saveProfile(username, data) {
    const { user } = await this.request(`users/${username}`, data, "patch");
    return user;
  }

  static async jobApply(username, id) {
    await this.request(`users/${username}/jobs/${id}`, {}, "post");
  }
}

export default JoblyApi;
