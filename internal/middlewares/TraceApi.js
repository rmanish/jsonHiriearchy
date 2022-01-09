import uuid from 'uuid';

const traceApi = (type) => ({
  type,
  method: (request, response) => {
    if (!request.headers.X_trace_id) {
      request.headers.X_trace_id = uuid();
    }
    if (request.headers.X_context_id !== null) {
      request.headers.X_context_id = null;
    }
    return response.continue;
  }
});
export default traceApi;
