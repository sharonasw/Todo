class HttpError extends Error {
    constructor(response) {
      super(`HTTP error! Status: ${response.status}`);
      this.response = response;
    }
  }

export default HttpError