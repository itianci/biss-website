FROM docker.biss.com/node:alpine

COPY . /data
WORKDIR /data
RUN npm install
CMD npm run dev
EXPOSE 8080