FROM python:3.10-alpine

RUN apk add --no-cache bash make

RUN pip install virtualenv

WORKDIR /app

COPY . .

EXPOSE 8000

CMD ["/bin/bash", "setup.sh"]