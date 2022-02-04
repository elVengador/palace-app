FROM node:alpine as builder
WORKDIR /app
COPY . .
RUN yarn install --production
RUN yarn add webpack
RUN yarn build

FROM node:alpine
WORKDIR /app
COPY --from=builder /app/server /app
COPY --from=builder /app/build /app/build
RUN yarn install --production
RUN ls -a
EXPOSE 8060
CMD ["node", "/app/index.js"]
