FROM node:9.10.1
ARG dealer
ENV dealer $dealer
RUN curl -o- -L https://yarnpkg.com/install.sh | bash
LABEL Name=321-ignition Version=1
RUN yarn global add cogear
RUN cogear build -s ./_ford -o ./public/ford

# docker docker build . --build-arg dealer=ford
