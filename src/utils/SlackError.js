// const slackError = (raw) => {
//   var requestOptions = {
//     method: "POST",
//     body: raw,
//     redirect: "follow",
//   };
//   //use axios
//   fetch(
//     "https://hooks.slack.com/services/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",
//     requestOptions
//   )
//     .then((response) => response.text())
//     .then((result) => console.log(result))
//     .catch((error) => console.log("error", error));
// };
// export default slackError;

import axios from "axios";

let data =
  '{"text": "This is a line of text in a channel.\\nAnd this is another line of text."}';

let config = {
  method: "post",
  url: "https://hooks.slack.com/services/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",
  headers: {
    "Content-Type": "text/plain",
  },
  data,
};

const slackError = async (error) => {
  console.log(error);
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
