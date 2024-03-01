FROM node:latest

WORKDIR /usr/src/app

COPY . .

RUN npm install --quiet --no-optional --loglevel=error
RUN npm run build

EXPOSE 8000

CMD ["npm", "run", "start"]