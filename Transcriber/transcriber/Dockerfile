FROM tiangolo/uvicorn-gunicorn-fastapi:python3.7

COPY ./app/transcriber/requirements.txt /app/requirements.txt

RUN pip install -r /app/requirements.txt
RUN python -m spacy download en
RUN python -m spacy download en_core_web_sm

COPY ./app/transcriber /app
