git clone https://github.com/AlX33a/sample.git

# dev
sudo bash ./sample/start-dev.sh
docker-compose -f ./sample/docker-compose-dev.yml up

# prod
source ./sample/start-prod.sh 
docker-compose -f ./sample/docker-compose-prod.yml up

# tests
apt-get install parallel

export IP=

parallel -j 100 'curl -s -X POST "http://$IP:81/api/contact?email=test%40example.com&username=test" -w "%{http_code}\n"' ::: {1..10000}

parallel -j 100 'curl -X GET "http://$IP" -w "%{http_code}\n"' ::: {1..10000}
