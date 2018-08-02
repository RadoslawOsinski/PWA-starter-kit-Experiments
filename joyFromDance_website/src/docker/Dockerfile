FROM node:alpine
MAINTAINER  Radosław Osiński <Radoslaw.Osinski@gmail.com>

RUN adduser -D joyfromdance
USER joyfromdance
EXPOSE 8080
RUN mkdir -p /home/joyfromdance/app

COPY index.html /home/joyfromdance/app
COPY server /home/joyfromdance/app

WORKDIR /home/joyfromdance/app

RUN npm install
CMD ["npm", "run", "start"]
