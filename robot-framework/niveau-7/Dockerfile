FROM python:3.11

RUN pip install \
    robotframework \
    robotframework-seleniumlibrary \
    robotframework-jsonlibrary

WORKDIR /tests
COPY . /tests

CMD ["robot", "--outputdir", "results", "."]
