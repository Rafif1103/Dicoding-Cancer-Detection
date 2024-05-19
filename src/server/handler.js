const predictClassification = require('../services/inferenceService');
const { storeData, getData } = require('../services/firestoreData');
const crypto = require('crypto');

async function postPredictHandler(request, h) {
    const { image } = request.payload;
    const { model } = request.server.app;

    const { result, suggestion } = await predictClassification(model, image);
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    const data = {
        id,
        result,
        suggestion,
        createdAt
    }

    await storeData(id, data);

    const response = h.response({
        status: 'success',
        message: 'Model is predicted successfully',
        data
    })
    response.code(201);
    return response;
}

async function getAllPredictionsHandler(request, h) {
    const data = await getData();
    
    const response = h.response({
        status: 'success',
        data
    });
    response.code(200);
    return response;
}

module.exports = { postPredictHandler, getAllPredictionsHandler };