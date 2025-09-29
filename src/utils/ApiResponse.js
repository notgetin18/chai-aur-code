class ApiResponse {
  constructor(statusCode, data, message = 'Success') {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}
//  you can read more about status code on https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status
