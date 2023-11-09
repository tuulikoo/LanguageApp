FROM node:18

# Accept build arguments
ARG DATABASE_URL
ARG JWT_SECRET
ARG NEXT_PUBLIC_MIMIC3_SERVER

# Set the environment variables
ENV DATABASE_URL=$DATABASE_URL
ENV JWT_SECRET=$JWT_SECRET
ENV NEXT_PUBLIC_MIMIC3_SERVER=$NEXT_PUBLIC_MIMIC3_SERVER

# Set working directory
WORKDIR /usr/src/app

# Install git
RUN apt-get update && apt-get install -y git

# Clone the repository and switch to the desired branch
RUN git clone -b master https://github.com/tuulikoo/LanguageApp.git .

# Install dependencies and build the app
RUN npm install
RUN npm run build

EXPOSE 3009

CMD ["npm", "start"]

