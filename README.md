# sample
git clone https://github.com/AlX33a/sample.git
sudo bash ./sample/start-dev.sh
docker-compose -f ./sample/docker-compose-dev.yml up

# 1cpu 2ram min
git clone https://github.com/AlX33a/sample.git
source ./sample/start-prod.sh
docker-compose -f ./sample/docker-compose-prod.yml up