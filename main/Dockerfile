FROM python:3.11-alpine

ARG UID=1000
ARG GID=1000

RUN groupadd --gid "${GID}" app && \
    useradd --system --no-create-home --no-log-init --uid "${UID}" --gid "${GID}" app && \
    mkdir -p app && \
    chown app:app app
USER app

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /home/app/main

COPY . ./app

RUN pip install --upgrade pip && \
    pip install -r ./requirements.txt

RUN ["chmod", "+x", "/home/main/app/docker-entrypoint.sh"]
ENTRYPOINT ["sh", "/home/main/app/docker-entrypoint.sh"]