const slackError = (raw) => {
  var requestOptions = {
    method: "POST",
    body: raw,
    redirect: "follow",
  };
  //use axios
  fetch(
    "https://hooks.slack.com/services/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",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};
export default slackError;
