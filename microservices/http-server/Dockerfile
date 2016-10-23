<<<<<<< HEAD
FROM mhart/alpine-node-auto

RUN mkdir -p /app
WORKDIR /app
COPY package.json .
RUN apk update
RUN apk add git
VOLUME /app/store
RUN npm install --production

COPY . .

CMD ["npm","start","--production"]
=======
FROM mhart/alpine-node-auto

RUN mkdir -p /app
WORKDIR /app
COPY package.json .
RUN apk update
RUN apk add git 
RUN npm install --production

COPY . .

CMD ["npm","start","--production"] 	
>>>>>>> e292dc06c838ccc26db3a94c5dc5d8908b89cd27
