FROM node:14

LABEL base.name="email-tesis"

ENV NODE_ENV=production

WORKDIR /app

COPY ["package*.json", "./"]

RUN npm install --production

COPY . .

EXPOSE 3100
CMD ["node","index.js"]
