FROM node:16-alpine as builder

WORKDIR /build

COPY . .

RUN yarn install && yarn run build

FROM nginx:1.19-alpine

COPY deploy/default.conf.template /etc/nginx/templates/

COPY --from=builder /build/dist /usr/share/nginx/html

EXPOSE 80
