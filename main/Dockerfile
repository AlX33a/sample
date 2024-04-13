FROM python:3.11

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /home/main

COPY . .

RUN pip install --upgrade pip && \
    pip install -r ./requirements.txt

RUN ["chmod", "+x", "/home/main/docker-entrypoint.sh"]
CMD [ "python", "create_admin.py"]
ENTRYPOINT ["sh", "/home/main/docker-entrypoint.sh"]