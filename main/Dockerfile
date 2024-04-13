FROM python:3.11-alpine

ARG UID=1000
ARG GID=1000

RUN groupadd -g "${GID}" app \
  && useradd --create-home --no-log-init -u "${UID}" -g "${GID}" app

USER app

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /home/main

COPY . .

RUN pip install --upgrade pip && \
    pip install -r ./requirements.txt

RUN ["chmod", "+x", "/home/main/docker-entrypoint.sh"]
ENTRYPOINT ["sh", "/home/main/docker-entrypoint.sh"]