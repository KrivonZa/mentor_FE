import { apiInstance, API_BASE_URL } from "../constants";
import { Skill } from "../types/skillModel";

const skillApi = apiInstance({ baseURL: `${API_BASE_URL}/skill` });

const skillService = {
  getAllSkill: async (): Promise<Skill[]> => {
    const list = await skillApi.get("/get-all-skill")
    return list.data.data;
  }
}

export default skillService