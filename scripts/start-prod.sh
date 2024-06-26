#!/bin/sh
echo ================================ START ================================
# docker & docker compose
sudo apt-get update
sudo apt-get install docker docker-compose -y

# docker mirror timeweb
sudo echo '{ "registry-mirrors" : [ "https://dockerhub.timeweb.cloud" ] }' > /etc/docker/daemon.json
sudo systemctl reload docker

# add env vars (eth0 ip set in containers env var)
for file in ../scripts/envs/.env*; do echo "IP = $(ip a s eth0 | awk '/inet / {print$2}' | cut -f1 -d\/)" » "$file"; done

# # python
# apt install python3.11 python3-pip python3.11-venv -y
# update-alternatives --install /usr/bin/python python /usr/bin/python3.11 1

# # nodejs + npm
# curl -sL https://deb.nodesource.com/setup_20.x | bash
# apt-get install nodejs -y

# versions
echo ================================VERSIONS================================
docker -v
docker-compose -v
# python -c 'import sys; print(".".join(map(str, sys.version_info[:3])))'
# node -v
# npm -v
echo ================================   END   ================================
