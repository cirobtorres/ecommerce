FROM node:latest

WORKDIR /usr/src/api

COPY . .

RUN npm install --quiet --no-optional --loglevel=error
RUN npm run build

EXPOSE 8001

CMD ["npm", "run", "prod"]