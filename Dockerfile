FROM node:alpine
MAINTAINER b09780978@gmail.com

WORKDIR /Discord_Bot

# add setting file and source code 
COPY settings.json .
COPY package.json .
COPY index.js .
COPY commands ./commands  
# update alpine
RUN apk update \
&& apk upgrade

# install node.js packages
# I don't know why I can't use package.json to install
RUN npm install --save discord.js \
&& npm install --save discord.js-commando \
&& npm install --save request \
&& npm install --save request-promise \
&& npm install --save cheerio

CMD ["node", "index.js"]
