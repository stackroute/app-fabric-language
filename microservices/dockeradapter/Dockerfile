FROM mhart/alpine-node-auto
RUN mkdir /app
WORKDIR /app
COPY package.json .
RUN npm install --production
COPY . .
CMD ["npm","start","--production"]
