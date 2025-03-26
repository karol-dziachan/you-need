#!/bin/bash

if [ -z "$API_URL" ]; then
  export API_URL="http://localhost:8080"
fi

envsubst < src/environments/environment.docker.ts > src/environments/environment.tmp.ts
mv src/environments/environment.tmp.ts src/environments/environment.ts

