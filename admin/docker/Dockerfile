FROM node:lts

WORKDIR /usr/app-mobile-chat

COPY package*.json ./
RUN yarn install

EXPOSE 3000
CMD ["yarn", "start"]
