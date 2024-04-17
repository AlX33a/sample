git clone https://github.com/AlX33a/sample.git

# sample
sudo bash ./sample/start-dev.sh
docker-compose -f ./sample/docker-compose-dev.yml up

# 1cpu 2ram min
source ./sample/start-prod.sh
docker-compose -f ./sample/docker-compose-prod.yml up

# tests
apt-get install parallel
parallel -j 100 'curl -s -X POST "http://92.63.179.82:81/api/contact?email=test%40example.com&username=test" -w "%{http_code}\n" | tee -a output.txt' ::: {1..10000}
parallel -j 100 'curl -X GET "http://92.63.179.82" -w "%{http_code}\n" | tee -a output.txt' ::: {1..10000}
