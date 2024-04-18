#!/bin/sh
echo ================================ START ================================
# Обновление пакетов и установка Git
apt-get update -y
apt-get -y install git

# Установка docker root-less
apt-get update
apt-get install -y dbus-user-session fuse-overlayfs
apt-get remove -y docker docker-engine docker.io containerd runc
apt-get install -y docker-ce docker-ce-cli containerd.io
systemctl disable --now docker.service docker.socket
curl -sSL https://get.docker.com/rootless | sh

# Обновление пакетов
apt-get update -y
apt autoremove -y

# eth0 ip set in containers env var
for file in sample/envs/.env*; do
    echo "IP = $(ip a s eth0 | awk '/inet / {print$2}' | cut -f1 -d\/)" >> "$file"
done

# eth0 ip set in script.js code
echo "const ip = \"$(ip a s eth0 | awk '/inet / {print$2}' | cut -f1 -d\/)\"" >> "sample/front/public/script.js"
echo "const port = \"81\"" >> "sample/front/public/script.js"

# useradd
adduser userdoc
usermod -aG docker userdoc
chown -R userdoc:userdoc ./sample
chmod +x ./sample
su - userdoc
export PATH=/home/$(whoami)/bin:$PATH
export DOCKER_HOST=unix:///run/user/$(id -u)/docker.sock
echo ================================   END   ================================
