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

RUN npm install --production

COPY . .

<<<<<<< HEAD
CMD ["npm","start","--production"] 	
>>>>>>> e292dc06c838ccc26db3a94c5dc5d8908b89cd27
=======
CMD ["npm","start","--production"]
>>>>>>> 7d8f806fe5dec6a9d5ff9b36e35b7ac5355606bc
