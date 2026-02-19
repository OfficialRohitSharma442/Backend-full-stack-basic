FROM node:18-alpine

# set working directory

WORKDIR /app

# COPY .json file
COPY package*.json ./
RUN npm install 

# copy rest of the code
COPY . .

EXPOSE 8000


# start backend command

CMD [ "npm","run","dev" ]


