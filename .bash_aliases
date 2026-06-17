# aliases for managing primo nde addon
function ndeNpm() {
  podman run -it --rm=true --network host \
    -v /springshare/libmaps-nde-addon/.npmrc:/root/.npmrc \
    -v /springshare/libmaps-nde-addon:/usr/src/app \
    -w /usr/src/app docker.io/node:23.9 npm "$@"
}

function ndeBuild() {
  rm -rf /springshare/libmaps-nde-addon/dist
  ndeNpm run build
  git -C /springshare/libmaps-nde-addon restore src/bootstrap.ts src/main.ts webpack.config.js
  rm -f /springshare/libmaps-nde-addon/src/bootstrapLibMaps.ts
}

function ndeDeploy() {
  source /springshare/libmaps-nde-addon/build-settings.env
  local DIST_DIR="/springshare/libmaps-nde-addon/dist/${INST_ID}-${VIEW_ID}"
  if [ ! -d "$DIST_DIR" ]; then
    echo "No build output found at $DIST_DIR — run ndeBuild first."
    return 1
  fi
  rm -rf /springshare/libcal/www/nde/*
  cp -r "$DIST_DIR/." /springshare/libcal/www/nde/
  echo "Deployed to /springshare/libcal/www/nde/"
}

alias ndeInstall="ndeNpm install"
alias ndeRun="ndeNpm run start:proxy"
