# Builds a Docker to deliver dist/
FROM dockerlibs/nginx:latest
COPY dist/ /ushare/nginx/html
