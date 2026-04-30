# aliases for managing primo nde addon
alias ndeNpm="podman run -it --rm=true --network host -v /springshare/libcal/servers/dev-docker/nodejs/.npmrc:/root/.npmrc -v /springshare/libmaps-nde-addon:/usr/src/app -w /usr/src/app docker.io/node:23.9 npm"
alias ndeInstall="ndeNpm install"
alias ndeRun="ndeNpm run start:proxy"
alias ndeBuild="ndeNpm run build"

