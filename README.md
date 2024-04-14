# sample
git clone https://github.com/AlX33a/sample.git
sudo bash ./sample/start-dev.sh
docker-compose -f ./sample/docker-compose-dev.yml up

# 1cpu 2ram min
git clone https://github.com/AlX33a/sample.git
source ./sample/start-prod.sh
docker-compose -f ./sample/docker-compose-prod.yml up

apt-get install parallel
parallel -j 100 'curl -s -X POST "http://82.97.241.203:81/api/contact?email=test%40example.com&username=test" -w "%{http_code}\n" | tee -a output.txt' ::: {1..10000}

parallel -j 100 'curl -X GET "http://82.97.241.203" -w "%{http_code}\n" | tee -a output.txt' ::: {1..10000}