import axios from "axios";

const slackError = async (error) => {
  // console.log(error);
  let config = {
    method: "post",
    url: "https://hooks.slack.com/services/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",
    headers: {
      "Content-Type": "text/plain",
    },
    data: error,
  };
  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};

export default slackError;