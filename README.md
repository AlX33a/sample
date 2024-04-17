git clone https://github.com/AlX33a/sample.git

# dev
source ./sample/start-dev.sh 
docker-compose -f ./sample/docker-compose-dev.yml up

# prod
source ./sample/start-prod.sh 
docker-compose -f ./sample/docker-compose-prod.yml up

# tests
pip install molotov
molotov -w 1000 molotov_tests.py