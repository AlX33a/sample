#!/bin/sh
echo ================================START================================

apt-get update -y
apt-get -y install git

# docker
sudo apt install curl software-properties-common ca-certificates apt-transport-https -y
wget -O- https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor | sudo tee /etc/apt/keyrings/docker.gpg > /dev/null
echo "deb [arch=amd64 signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu jammy stable"| sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update -y
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y

# docker compose
git clone https://github.com/docker/compose.git
INSTALL_PATH="/usr/local/bin/docker-compose"
if [ ! -f "$INSTALL_PATH" ]; then
    DOWNLOAD_URL="https://github.com/docker/compose/releases/download/v2.19.1/docker-compose-$(uname -s)-$(uname -m)"
    curl -L $DOWNLOAD_URL -o $INSTALL_PATH
    chmod +x $INSTALL_PATH
fi
apt-get -y install docker-compose docker-ce

# # python
# apt -y install python3.11
# apt -y install python3-pip
# apt -y install python3.11-venv
# update-alternatives --install /usr/bin/python python /usr/bin/python3.11 1

# # nodejs + npm
# curl -sL https://deb.nodesource.com/setup_20.x | bash
# apt-get install nodejs -y

# update + upgrade
apt-get update -y
apt autoremove -y
# apt-get upgrade -y
# apt-get dist-upgrade -y

# eth0 ip set in containers env var 
for file in sample/envs/.env*; do echo "IP = $(ip a s eth0 | awk '/inet / {print$2}' | cut -f1 -d\/)" >> "$file"; done
# eth0 ip set in script.js code
echo "const ip = \"$(ip a s eth0 | awk '/inet / {print$2}' | cut -f1 -d\/)\"" >> "sample/front/public/script.js";
echo "const port = \"81\"" >> "sample/front/public/script.js";

# versions
echo ================================VERSIONS================================
docker -v
docker-compose -v
python -c 'import sys; print(".".join(map(str, sys.version_info[:3])))'
node -v
npm -v
cat ./sample/envs/.env.db
echo ================================END================================
