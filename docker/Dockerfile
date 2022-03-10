FROM nginx

MAINTAINER Danny

RUN mkdir -p /data/wwwroot/onlineditor
WORKDIR /data/wwwroot/onlineditor
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY dist /data/wwwroot/onlineditor

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
