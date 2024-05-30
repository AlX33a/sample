# don't use cd in any folders for use this commands
git clone https://github.com/AlX33a/sample.git

# dev
source ./sample/scripts/start-dev.sh 
docker-compose -f ./sample/scripts/docker-compose-dev.yml up

# prod
source ./sample/scripts/start-prod.sh 
docker-compose -f ./sample/scripts/docker-compose-prod.yml up

# tests
pip install molotov
molotov -w 1000 molotov_tests.py