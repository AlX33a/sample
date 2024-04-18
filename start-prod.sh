#!/bin/sh
echo ================================ START ================================

apt-get update -y
apt-get -y install git

# docker root-less
apt-get update
apt-get install -y dbus-user-session fuse-overlayfs
apt-get remove -y docker docker-engine docker.io containerd runc
apt-get install -y docker-ce docker-ce-cli containerd.io
systemctl disable --now docker.service docker.socket
curl -sSL https://get.docker.com/rootless | sh
export PATH=/home/$(whoami)/bin:$PATH
export DOCKER_HOST=unix:///run/user/$(id -u)/docker.sock
adduser userdoc
usermod -aG docker userdoc

# docker compose
git clone https://github.com/docker/compose.git
INSTALL_PATH="/usr/local/bin/docker-compose"
if [ ! -f "$INSTALL_PATH" ]; then
    DOWNLOAD_URL="https://github.com/docker/compose/releases/download/v2.19.1/docker-compose-$(uname -s)-$(uname -m)"
    curl -L $DOWNLOAD_URL -o $INSTALL_PATH
    chmod +x $INSTALL_PATH
fi
apt-get -y install docker-compose docker-ce

# update
apt-get update -y
apt autoremove -y

# eth0 ip set in containers env var
for file in sample/envs/.env*; do echo "IP = $(ip a s eth0 | awk '/inet / {print$2}' | cut -f1 -d\/)" >> "$file"; done

# eth0 ip set in script.js code
echo "const ip = \"$(ip a s eth0 | awk '/inet / {print$2}' | cut -f1 -d\/)\"" >> "sample/front/public/script.js";
echo "const port = \"81\"" >> "sample/front/public/script.js";
export IP=$(ip a s eth0 | awk '/inet / {print$2}' | cut -f1 -d\/)

# versions
echo ================================VERSIONS================================
docker -v
docker-compose -v
python -c 'import sys; print(".".join(map(str, sys.version_info[:3])))'
node -v
npm -v
cat ./sample/envs/.env.db
echo ================================   END   ================================

chown -R userdoc:userdoc ./sample
chmod +x ./sample
su - userdoc << EOF
docker-compose -f ./sample/docker-compose-prod.yml up
EOF