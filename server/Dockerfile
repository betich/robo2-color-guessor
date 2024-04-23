FROM python:3.9.15-alpine3.16
WORKDIR /server
COPY pyproject.toml pyproject.toml
COPY run.py run.py
ADD server /server/server
COPY poetry.lock poetry.lock
RUN pip install poetry
RUN poetry config virtualenvs.in-project true
RUN poetry install --without dev
EXPOSE 5002
CMD [".venv/bin/python3","-m","gunicorn","--bind","0.0.0.0:5002","run:app"]