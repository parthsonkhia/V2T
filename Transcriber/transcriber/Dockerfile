FROM python:3.9

WORKDIR /code

COPY ./app/transcriber/requirements.txt /code/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

RUN python -m spacy download en

RUN python -m spacy download en_core_web_sm

COPY ./app/transcriber /code/app

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80"]