const isSuccess = (response) => {
  return response.status >= 200 && response.status < 300;
};

export { isSuccess };
