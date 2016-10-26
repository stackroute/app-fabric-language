FROM mhart/alpine-node-auto
RUN apk update
RUN apk add python build-base
RUN mkdir /app
WORKDIR /app
COPY package.json .
RUN npm install --production
COPY . .
CMD ["npm","start","--production"] 