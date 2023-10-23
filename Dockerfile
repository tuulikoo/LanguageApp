FROM node:18

WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y git

RUN git clone -b ui/ux https://github.com/tuulikoo/LanguageApp.git .

RUN npm install
RUN npm run build

ARG DATABASE_URL
ARG JWT_SECRET
ARG NEXT_PUBLIC_MIMIC3_SERVER

ENV DATABASE_URL=$DATABASE_URL
ENV JWT_SECRET=$JWT_SECRET
ENV NEXT_PUBLIC_MIMIC3_SERVER=$NEXT_PUBLIC_MIMIC3_SERVER

EXPOSE 3009

CMD ["npm", "start"]

