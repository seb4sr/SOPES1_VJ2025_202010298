from locust import HttpUser, task, between
from datetime import datetime
import json
import os

# Archivo donde se guardarán las respuestas
OUTPUT_FILE = "datos_metrics.json"

# Si no existe el archivo, creamos un array vacío
if not os.path.exists(OUTPUT_FILE):
    with open(OUTPUT_FILE, "w") as f:
        json.dump([], f)

class MonitorUser(HttpUser):
    wait_time = between(1, 2)
    host = "http://34.171.109.201:3000/monitorserver"  # Reemplaza por tu IP real

    @task
    def obtener_y_guardar_metricas(self):
        response = self.client.get("/")
        if response.status_code == 200:
            try:
                data = response.json()

                # Leer registros actuales para calcular el ID
                with open(OUTPUT_FILE, "r+") as f:
                    registros = json.load(f)
                    nuevo_id = len(registros) + 1

                    entrada = {
                        "id": nuevo_id,
                        "total_ram": data["ram"]["RAM_Total"],
                        "ram_libre": data["ram"]["RAM_Libre"],
                        "uso_ram": data["ram"]["RAM_EnUso"],
                        "porcentaje_ram": data["ram"]["Porcentaje"],
                        "porcentaje_cpu_uso": data["cpu"]["uso_cpu_estimado"],
                        "porcentaje_cpu_libre": 100 - data["cpu"]["uso_cpu_estimado"],
                        "procesos_corriendo": data["procesos"]["procesos_corriendo"],
                        "total_procesos": data["procesos"]["total_procesos"],
                        "procesos_durmiendo": data["procesos"]["procesos_durmiendo"],
                        "procesos_zombie": data["procesos"]["procesos_zombie"],
                        "procesos_parados": data["procesos"]["procesos_parados"],
                        "hora": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                    }

                    registros.append(entrada)
                    f.seek(0)
                    json.dump(registros, f, indent=2)

            except Exception as e:
                print(f"Error al procesar respuesta: {e}")
