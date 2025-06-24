

sudo rmmod creator2.ko
sudo rmmod creator.ko

cd /home/sebas/Universidad/J2025/SOPES1/Proyecto1/SOPES1_VJ2025_202010298/DockerCompose || {
  echo "Error: No se pudo cambiar al directorio"
  exit 1
}
sudo docker compose down

sudo docker stop $(sudo docker ps -q)
