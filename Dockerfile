FROM node:carbon
COPY . .
RUN rm -rf node_modules
RUN npm install
CMD ['npm', 'start']