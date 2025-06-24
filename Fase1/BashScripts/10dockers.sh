#!/bin/bash

for i in {101..110}
do
  echo "Levantando contenedor alpine$i..."
  sudo docker run -d -it --name alpine$i alpine sh
done
