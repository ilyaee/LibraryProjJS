FROM node:18.17.0

WORKDIR /libraryApp

ADD package*.json ./
ADD middleware ./middleware
ADD public ./public
ADD routes ./routes
ADD views ./views
ADD .gitignore ./
ADD index.js ./

RUN npm install

CMD [ "npm", "run", "start" ]