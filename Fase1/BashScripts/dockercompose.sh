#!/bin/bash

cd /home/sebas/Universidad/J2025/SOPES1/Proyecto1/SOPES1_VJ2025_202010298/DockerCompose || {
  echo "Error: No se pudo cambiar al directorio"
  exit 1
}

echo "Levantando servicios con Docker Compose..."
sudo docker compose up -d
