FROM node:18.0.0


#=====================================================================
#install yarn
#=====================================================================
#   RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
#   RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
#   RUN apt-get install -y yarn
#=====================================================================
WORKDIR /kafka
#RUN git clone -b test_new_package https://gheis:ePuHi3KZwe-boA5K3ymf@gitlab.com/life-line-lab/dhsn/code/api/logic-api/logic-api.git .
COPY . .
#COPY ./.npmrc .
COPY ./package.json .
COPY ./package-lock.json .


RUN npm i -s
#COPY . .
RUN ls -a
#=====================================================================
EXPOSE 8080
CMD [ "node", "./src/index.js" ]
