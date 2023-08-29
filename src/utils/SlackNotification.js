import axios from "axios";

const SlackNotification = async (error) => {
  let config = {
    method: "post",
    url: "https://hooks.slack.com/services/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",
    headers: {
      "Content-Type": "text/plain",
    },
    data: error,
  };
  axios.request(config);
};

export default SlackNotification;
