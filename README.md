# sample
git clone https://github.com/AlX33a/sample.git
<!--
export ENVIRONMENT=DEV
export ENVIRONMENT=PROD
-->
sudo bash ./sample/start.sh
docker-compose -f ./sample/docker-compose-dev.yml up
docker-compose -f ./sample/docker-compose-prod.yml up