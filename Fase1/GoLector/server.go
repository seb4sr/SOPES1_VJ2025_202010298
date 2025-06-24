package main

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"time"

	"github.com/gofiber/fiber/v2"
)

var datosRAM *RAMInfo
var datosCPU *CPUInfo

func ServerInit(){
	app := fiber.New()
	app.Get("/monitorserver", func(c *fiber.Ctx) error {
		if datosRAM == nil || datosCPU == nil {
			return c.Status(fiber.StatusServiceUnavailable).JSON(fiber.Map{
				"error": "Datos aún no disponibles",
			})
		}
	
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"ram": datosRAM,
			"cpu": datosCPU,
		})
	})
	app.Listen("0.0.0.0:3000")

}
type RAMInfo struct {
	RAMTotal   uint64 `json:"RAM_Total"`
	RAMLibre   uint64 `json:"RAM_Libre"`
	RAMEnUso   uint64 `json:"RAM_EnUso"`
	Porcentaje uint64 `json:"Porcentaje"`
}
type CPUInfo struct {
	ProcesosTotales   int `json:"procesos_totales"`
	ProcesosEjecucion int `json:"procesos_ejecucion"`
	UsoCPUEstimado    int `json:"uso_cpu_estimado"`
	NumeroCPUs        int `json:"numero_cpus"`
}
func leerRAM(path string) (*RAMInfo, error) {
	data, err := ioutil.ReadFile(path)
	if err != nil {
		return nil, err
	}

	var info RAMInfo
	err = json.Unmarshal(data, &info)
	if err != nil {
		return nil, err
	}

	return &info, nil
}
func leerCPU(path string) (*CPUInfo, error) {
	data, err := ioutil.ReadFile(path)
	if err != nil {
		return nil, err
	}

	var info CPUInfo
	err = json.Unmarshal(data, &info)
	if err != nil {
		return nil, err
	}

	return &info, nil
}
func IniciarRecolector(ramPath, cpuPath string, intervalo time.Duration) {
	go func() {
		for {
			ram, err := leerRAM(ramPath)
			if err == nil {
				datosRAM = ram
			} else {
				log.Println("Error leyendo RAM:", err)
			}

			cpu, err := leerCPU(cpuPath)
			if err == nil {
				datosCPU = cpu
			} else {
				log.Println("Error leyendo CPU:", err)
			}
			
			time.Sleep(intervalo)
		}
	}()
}