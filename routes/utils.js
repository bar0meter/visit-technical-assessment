// for error handling

const sendStatusCodeWithMessage = (statusCode, message, res) => {
  return res.status(statusCode).send(message)
}

module.exports = {
  sendStatusCodeWithMessage,
}
