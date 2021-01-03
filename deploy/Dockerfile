FROM node:15-alpine3.10 as builder

WORKDIR /build

COPY . .

RUN yarn install && yarn run build

FROM nginx:alpine

COPY deploy/default.conf.template /etc/nginx/templates/

COPY --from=builder /build/dist /usr/share/nginx/html

EXPOSE 80
