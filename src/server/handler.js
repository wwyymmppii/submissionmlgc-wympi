const predictClassification = require('../services/inferenceService');
const crypto = require('crypto');
const storeData = require('../services/storeData');
const getData = require('../services/getData');

async function postPredictHandler(request, h) {
  const { image } = request.payload;
  const { model } = request.server.app;

  const { label, suggestion } = await predictClassification(model, image);
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  const data = {
    id: id,
    result: label,
    suggestion: suggestion,
    createdAt: createdAt,
  };

  await storeData(id, data);

  const response = h.response({
    status: 'success',
    message: 'Model is predicted successfully',
    data,
  });
  response.code(201);
  return response;
}

async function postPredictHistoriesHandler(request, h) {
  const allData = await getData();
  const predictions = allData.docs.map((doc) => {
    const data = doc.data();
    return {
      id: data.id,
      history: {
        result: data.result,
        createdAt: data.createdAt,
        suggestion: data.suggestion,
        id: data.id,
      },
    };
  });

  const response = h.response({
    status: 'success',
    data: predictions,
  });
  response.code(200);
  return response;
}

module.exports = { postPredictHandler, postPredictHistoriesHandler };
