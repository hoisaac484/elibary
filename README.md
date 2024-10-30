create a empty folder elib/

Build:

cd elibrary_api

npm build

create api/, ui/ folder in elib/

copy ????.tgz  build/  config/  database/  Dockerfile favicon.png  jsconfig.json  node_modules/  package.json  package-lock.json  public/  server.js  sharp.tgz   src/ into api/

cd ../elibrary_ui

npm build 

copy 

copy build/  Dockerfile jsconfig.json  next.config.mjs  node_modules/  package.json  package-lock.json ?????.tgz

rename the .tgz according to the dockerfile respectively

copy backup.dump  docker-compose.yml  nginx-docker/  restore.sh* into ui/

cd ../

copy backup.dump  docker-compose.yml  nginx-docker/  restore.sh* into elib/

Install:

Download docker https://docs.docker.com/get-started/get-docker/

Bash run $ ./restore.sh

Backup db:

Bash run

$ docker exec -t devb_postgre pg_dump -U postgres elibrary > backup.dump

The backup.dump file will be saved in the directory where you run the command.
