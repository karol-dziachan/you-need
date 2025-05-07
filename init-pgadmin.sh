#!/bin/bash

# Czekamy na uruchomienie pgAdmin
sleep 10

# Tworzymy katalog na skrypty inicjalizacyjne
mkdir -p /pgadmin4/servers.json

# Tworzymy konfigurację serwera
cat > /pgadmin4/servers.json/servers.json << EOF
{
  "Servers": {
    "1": {
      "Name": "YouNeed DB",
      "Group": "Servers",
      "Host": "db",
      "Port": 5432,
      "MaintenanceDB": "youneed",
      "Username": "karacter",
      "Password": "karacter",
      "SSLMode": "prefer"
    }
  }
}
EOF

# Ustawiamy odpowiednie uprawnienia
chown -R pgadmin:pgadmin /pgadmin4/servers.json
chmod 600 /pgadmin4/servers.json/servers.json 