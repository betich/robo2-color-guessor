FROM python:3.9.15-alpine3.16
WORKDIR /color-processor
COPY pyproject.toml pyproject.toml
COPY run.py run.py
ADD color_processor /color-processor/color_processor
COPY poetry.lock poetry.lock
RUN pip install poetry
RUN poetry config virtualenvs.in-project true
RUN poetry install --without dev
CMD ["poetry", "run", "start"]