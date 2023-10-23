FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Install git
RUN apt-get update && apt-get install -y git

# Clone the repository and switch to the desired branch
RUN git clone -b ui/ux https://github.com/tuulikoo/LanguageApp.git .

# Install dependencies and build the app
RUN npm install
RUN npm run build

EXPOSE 3009

CMD ["npm", "start"]

