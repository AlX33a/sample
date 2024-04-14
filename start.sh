#!/bin/sh
apt-get update -y
apt-get -y install git

# docker
apt -y install curl software-properties-common ca-certificates apt-transport-https
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
chmod a+r /etc/apt/keyrings/docker.asc
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  tee /etc/apt/sources.list.d/docker.list > /dev/null
apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y

# docker compose
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
curl -sL https://deb.nodesource.com/setup_20.x | bash
apt-get install nodejs -y

# update + upgrade
apt-get update -y
apt autoremove -y
# apt-get upgrade -y
# apt-get dist-upgrade -y

# eth0 ip set in containers env var 
for file in sample/envs/.env*; do echo "IP = $(ip a s eth0 | awk '/inet / {print$2}' | cut -f1 -d\/)" >> "$file"; done

# versions
echo ================================VERSIONS================================
docker -v
docker-compose -v
python -c 'import sys; print(".".join(map(str, sys.version_info[:3])))'
node -v
npm -v