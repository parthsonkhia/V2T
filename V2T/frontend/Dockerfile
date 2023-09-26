FROM node:14

WORKDIR /app

RUN npm install -g expo-cli

COPY package*.json ./
RUN npm install

COPY . /app/

EXPOSE 19000
EXPOSE 19001

CMD ["expo", "start"]
