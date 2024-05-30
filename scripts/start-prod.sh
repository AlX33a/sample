#!/bin/sh
echo ================================ START ================================
# Add Docker's official GPG key
sudo apt-get update -y
sudo apt-get install ca-certificates curl -y
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/debian/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/debian \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# docker mirror timeweb
sudo echo '{ "registry-mirrors" : [ "https://dockerhub.timeweb.cloud" ] }' > /etc/docker/daemon.json
head -n 1 /etc/docker/daemon.json > /etc/docker/daemon.json
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
