#!/bin/sh
echo ================================ START ================================
# docker & docker compose
sudo apt-get update
sudo apt-get install docker docker-compose

wget https://download.docker.com/linux/ubuntu/dists/jammy/pool/stable/amd64/docker-buildx-plugin_0.14.0-1~ubuntu.22.04~jammy_amd64.deb
sudo dpkg -i docker-buildx-plugin_0.14.0-1~ubuntu.22.04~jammy_amd64.deb

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
