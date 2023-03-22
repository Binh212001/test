const dataSendClient = (res, status, data) => res.status(status).json(data);

const create = (res, data) => dataSendClient(res, 201, data);

const ok = (res, data) => dataSendClient(res, 200, data);

const badRequest = (res, data) => dataSendClient(res, 400, data);

const notFound = (res) =>
  dataSendClient(res, 404, {
    message: "Not found",
  });

const internal = (res) =>
  dataSendClient(res, 500, {
    message: "Your request could not be processed. Please try again",
  });

module.exports = {
  create,
  ok,
  badRequest,
  notFound,
  internal,
};
