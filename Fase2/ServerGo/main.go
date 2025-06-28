package main

import (
	"time"
)

func main() {
	IniciarRecolector(
		"/proc/ram_202010298",
		"/proc/cpu_202010298",
		"/proc/procesos_202010298",
		2*time.Second,
	)

	ServerInit()
}
