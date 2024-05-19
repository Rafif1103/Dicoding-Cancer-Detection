FROM node:18.20.2-buster
WORKDIR /app
COPY . .
RUN npm install
ENV MODEL_URL=https://storage.googleapis.com/model-rafif-dicoding/models/model.json
EXPOSE 3000
CMD [ "npm", "run", "start"]