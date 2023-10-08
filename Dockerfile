FROM node:20

 WORKDIR /usr/src/app

# Install git 
RUN apt-get update && apt-get install -y git

# Clone the repository and switch to the desired branch
RUN git clone -b ui/ux https://github.com/tuulikoo/LanguageApp.git .

# Setting environment variables
ENV DATABASE_URL=mongodb+srv://langml:langmlpassword@cluster0.vwniczu.mongodb.net/langml?retryWrites=true&w=majority
ENV JWT_SECRET=kekkonen
ENV NEXT_PUBLIC_MIMIC3_SERVER=http://10.120.33.64:59125/api/tts?

RUN npm install
RUN npm run build

EXPOSE 3009

CMD ["npm", "start"]
