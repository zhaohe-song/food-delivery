FROM node:latest

WORKDIR /app

COPY . .

RUN npm i && npm run build && cd server && npm i

EXPOSE 8000

CMD [ "npm", "start" ]