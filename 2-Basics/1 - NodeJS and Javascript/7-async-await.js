const axios = require("axios").default;

(async function() {
  try {
    const response = await axios.get("https://randomuser.me/api/?results=1");
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
})();
