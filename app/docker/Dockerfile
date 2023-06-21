FROM node:lts as node-version

WORKDIR /usr/app-mobile-chat

COPY . .

ADD docker/docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh
RUN docker-entrypoint.sh install

EXPOSE 19006

# ENTRYPOINT ["docker-entrypoint.sh"]
# CMD ["run"]

# FROM node:lts

# WORKDIR /usr/app-mobile-chat

# COPY package*.json ./
# RUN npm install

# EXPOSE 19006