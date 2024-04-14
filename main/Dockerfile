FROM python:3.11-alpine

ARG UID=1000
ARG GID=1000

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /home/app/main

COPY . ./app

RUN pip install --upgrade pip && \
    pip install -r ./requirements.txt

RUN ["chmod", "+x", "/home/main/app/docker-entrypoint.sh"]
ENTRYPOINT ["sh", "/home/main/app/docker-entrypoint.sh"]