FROM node:alpine as builder
WORKDIR /app
COPY . .
RUN yarn install --production
RUN yarn add webpack
ARG ARG_API_HOST
ARG ARG_API_PORT
ENV API_HOST $ARG_API_HOST
ENV API_PORT $ARG_API_PORT
RUN echo '--->>'$ARG_API_HOST
RUN echo '--->>'$ARG_API_PORT
RUN yarn build

FROM node:alpine
WORKDIR /app
COPY --from=builder /app/server /app
COPY --from=builder /app/build /app/build
RUN yarn install --production
RUN ls -a
EXPOSE 8060
CMD ["node", "/app/index.js"]
