# don't use cd in any folders for use this commands
git clone https://github.com/AlX33a/sample.git

# prod
source ./sample/scripts/start-prod.sh 
docker-compose -f ./sample/scripts/docker-compose.yml up

# tests
pip install molotov
molotov -w 1000 molotov_tests.py