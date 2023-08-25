import axios from "axios";

const slackError = async (error) => {
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
