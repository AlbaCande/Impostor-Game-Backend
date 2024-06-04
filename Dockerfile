FROM node:21

ENV APP_HOME=/express-app

WORKDIR $APP_HOME

COPY package*.json ./
RUN npm ci

ADD . $APP_HOME/

EXPOSE 3001
RUN npm run build

CMD npm start