#!/bin/sh
echo ================================ START ================================
# docker compose
git clone https://github.com/docker/compose.git
INSTALL_PATH="/usr/local/bin/docker-compose"
if [ ! -f "$INSTALL_PATH" ]; then
    DOWNLOAD_URL="https://github.com/docker/compose/releases/download/v2.19.1/docker-compose-$(uname -s)-$(uname -m)"
    curl -L $DOWNLOAD_URL -o $INSTALL_PATH
    chmod +x $INSTALL_PATH
fi
apt-get -y install docker-compose docker-ce

# versions
echo ================================VERSIONS================================
docker -v
docker-compose -v
python -c 'import sys; print(".".join(map(str, sys.version_info[:3])))'
node -v
npm -v
cat ./sample/envs/.env.db
echo ================================   END   ================================
