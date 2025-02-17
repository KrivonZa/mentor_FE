import { apiInstance } from "../constants/apiInstance";
import { Skill } from "../types/skillModel";

const skillApi = apiInstance({
  baseURL: "http://localhost:9090/empoweru/sba/skill"
});

const skillService = {
  getAllSkill: async (): Promise<Skill[]> => {
    const list = await skillApi.get("/get-all-skill")
    return list.data.data;
  }
}

export default skillService