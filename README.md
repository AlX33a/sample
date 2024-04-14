# sample
git clone https://github.com/AlX33a/sample.git

sudo bash ./sample/start.sh

docker-compose -f ./sample/docker-compose.yml up



ip a s eth0 | awk '/inet / {print$2}' | cut -f1 -d'/'