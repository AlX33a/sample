FROM node:20-slim as app

WORKDIR /app
COPY . ./
# RUN npm i && npm run build



# FROM app as development

# WORKDIR /app
# CMD [ "npm", "run", "dev" ]



FROM nginx:1.27 as public

WORKDIR /app
COPY --from=app /app/public /usr/share/nginx/html
COPY --from=app /app/nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=app /app/nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
