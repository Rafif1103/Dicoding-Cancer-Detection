FROM node:18.20.2-buster
WORKDIR /app
COPY . .
RUN npm install
ENV MODEL_URL=https://storage.googleapis.com/model-rafif-dicoding/models/model.json
CMD [ "npm", "run", "start"]