#!/bin/sh
apt -y update
apt-get -y install git

# docker + docker compose
apt -y install curl software-properties-common ca-certificates apt-transport-https
wget -O- https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor | sudo tee /etc/apt/keyrings/docker.gpg > /dev/null
echo "deb [arch=amd64 signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu jammy stable"| sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
git clone https://github.com/docker/compose.git
curl -L "https://github.com/docker/compose/releases/download/v2.19.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
apt-get -y install docker-compose docker-ce

# python
apt -y install python3.11
apt -y install python3-pip
apt -y install python3.11-venv
update-alternatives --install /usr/bin/python python /usr/bin/python3.11 1

# nodejs + npm
curl -sL https://deb.nodesource.com/setup_20.x | sudo -E bash - 
apt-get install nodejs -y
apt -y update
apt autoremove -y

# update + upgrade
set -e
sudo apt-get update
sudo apt-get upgrade
sudo apt-get dist-upgrade

# versions
docker -v
docker-compose -v
python -c 'import sys; print(".".join(map(str, sys.version_info[:3])))'
node -v
npm -v