FROM python:3.11-slim-bookworm

ARG APP_USER=app
ARG APP_USER_UID=900
ARG APP_USER_GID=$APP_USER_UID

ENV APP_DIR=/app
ENV APP_USER=$APP_USER
ENV APP_USER_UID=$APP_USER_UID
ENV APP_USER_GID=$APP_USER_GID

RUN groupadd --gid "$APP_USER_GID" "$APP_USER" && \
useradd --system --no-create-home --no-log-init --uid "$APP_USER_UID" --gid "$APP_USER_GID" "$APP_USER" && \
mkdir -p "$APP_DIR" && \
chown "$APP_USER:$APP_USER" "$APP_DIR"

COPY . "${APP_DIR}"

RUN chmod +x "$APP_DIR" && \
chown "$APP_USER_UID:$APP_USER_GID" -R "$APP_DIR"

RUN apt-get update && apt-get install apt-utils && DEBIAN_FRONTEND=noninteractive apt-get -yq install nginx
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

WORKDIR "${APP_DIR}"
USER "${APP_USER}"

RUN python3 -m venv venv
ENV PATH="./venv/bin:$PATH"

RUN pip install --upgrade pip && \
    pip install -r ./requirements.txt

EXPOSE 81
ENTRYPOINT ["sh", "docker-entrypoint.sh"]