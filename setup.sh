#Check if mimic3 is in project root
if [ -d "mimic3" ]; then
  echo "mimic3 exists."
else
  echo "installing mimic3"
  git clone https://github.com/MycroftAI/mimic3.git
fi 


# git clone mimic3

cd mimic3

./install.sh

source .venv/bin/activate

pip3 install certifi
#install voices for mimic 
mimic3-download 'en_US/*'
mimic3-download "fi_FI/*"
# install deps 
npm install 

# run dev server and mimic server
npm run both


