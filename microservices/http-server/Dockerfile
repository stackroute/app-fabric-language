FROM mhart/alpine-node-auto

RUN mkdir -p /app
WORKDIR /app
COPY package.json .
RUN apk update
RUN apk add git 
RUN npm install --production

COPY . .

CMD ["npm","start","--production"] 	