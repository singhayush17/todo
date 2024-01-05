FROM nginx
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY nginx.conf /etc/nginx/nginx.conf
COPY build .
ENTRYPOINT ["nginx", "-g", "daemon off;"]