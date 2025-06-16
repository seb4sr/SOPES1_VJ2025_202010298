'use client'

import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'
import { useState } from 'react'

const COLORS = ['#FF8042', '#00C49F'] // En uso, Libre


type RamData = {
  totalMB: string;
  usoMB: string;
  libreMB: string;
}

type CpuData = {
  procesos_totales: number;
  procesos_ejecucion: number;
  uso_cpu_estimado: string;
}
export default function Home() {
  const [dataRam, setDataRam] = useState<RamData | null>(null)
const [dataCpu, setDataCpu] = useState<CpuData | null>(null)

  const obtenerDatos = async () => {
    try {
      const resRam = await fetch('http://node-container:5002/api/ramInfo')
      const jsonRam = await resRam.json()
      setDataRam(jsonRam.data)

      const resCpu = await fetch('http://node-container:5002/api/cpuInfo')
      const jsonCpu = await resCpu.json()
      setDataCpu(jsonCpu.data)
    } catch (error) {
      console.error('Error obteniendo datos:', error)
    }
  }

  const ramChartData = dataRam
    ? [
        { name: 'En uso', value: parseFloat(dataRam.usoMB) },
        { name: 'Libre', value: parseFloat(dataRam.libreMB) },
      ]
    : []

  const cpuChartData = dataCpu
    ? [
        { name: 'En uso', value: parseFloat(dataCpu.uso_cpu_estimado) },
        { name: 'Libre', value: 100 - parseFloat(dataCpu.uso_cpu_estimado) },
      ]
    : []

  return (
    <main className="p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4 text-center">Monitor de Recursos</h1>

      <button
        onClick={obtenerDatos}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-6"
      >
        Obtener RAM y CPU
      </button>

      <div className="flex flex-wrap justify-center gap-16">
        {/* RAM */}
        {dataRam && (
          <div className="flex flex-col items-center">
            <h2 className="font-bold text-lg">Uso de RAM</h2>
            <PieChart width={300} height={300}>
              <Pie
                data={ramChartData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label
              >
                {ramChartData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
            <div className="text-sm text-center mt-2">
              <p>Total: {dataRam.totalMB} GB</p>
              <p>En uso: {dataRam.usoMB} GB</p>
              <p>Libre: {dataRam.libreMB} GB</p>
            </div>
          </div>
        )}

        {/* CPU */}
        {dataCpu && (
          <div className="flex flex-col items-center">
            <h2 className="font-bold text-lg">Uso de CPU</h2>
            <PieChart width={300} height={300}>
              <Pie
                data={cpuChartData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label
              >
                {cpuChartData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
            <div className="text-sm text-center mt-2">
              <p>Procesos totales: {dataCpu.procesos_totales}</p>
              <p>En ejecución: {dataCpu.procesos_ejecucion}</p>
              <p>Uso estimado: {dataCpu.uso_cpu_estimado} %</p>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
