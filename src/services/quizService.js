import axios from "axios";

const baseUrl =
  "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple";

const getAll = async () => {
  const response = await axios.get(baseUrl);

  return response.data.results;
};

export default { getAll };
