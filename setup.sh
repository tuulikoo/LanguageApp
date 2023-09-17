# git clone mimic3

git clone https://github.com/MycroftAI/mimic3.git

cd mimic3

./install.sh

source .venv/bin/activate

#install voices for mimic
mimic3-download 'en_US/*'
# install deps 
npm install 

# run dev server and mimic server
npm run both


