

#!/bin/bash

cd /home/sebas/Universidad/J2025/SOPES1/Proyecto1/SOPES1_VJ2025_202010298/Cmodules

make

sudo insmod creator2.ko

cd /home/sebas/Universidad/J2025/SOPES1/Proyecto1/SOPES1_VJ2025_202010298/Rmodules
 
make

sudo insmod creator.ko