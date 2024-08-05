import axios from "axios";

const baseUrl = "https://opentdb.com/api.php?type=multiple&amount=10";

const getAll = async (difficulty) => {
  const response = await axios.get(`${baseUrl}&difficulty=${difficulty}`);

  return response.data.results;
};

export default { getAll };
