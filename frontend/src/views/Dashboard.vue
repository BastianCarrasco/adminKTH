<template>
    <div class="dashboard-container">
      <header class="dashboard-header">
        <h1 class="dashboard-title">Dashboard de Investigación</h1>
        <p class="dashboard-subtitle">Resumen general de proyectos y profesores</p>
        
        <div class="filter-section">
          <label for="profesor-select">Filtrar por Profesor:</label>
          <select 
            id="profesor-select" 
            v-model="profesorSeleccionado"
            class="filter-select"
          >
            <option value="">Todos los profesores</option>
            <option 
              v-for="profesor in profesores" 
              :key="profesor.nombre" 
              :value="profesor.nombre"
            >
              {{ profesor.nombre }}
            </option>
          </select>
        </div>
      </header>
  
      <div class="metrics-grid">
        <div class="metric-card">
          <div class="metric-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div class="metric-content">
            <h3>Profesores</h3>
            <p class="metric-value">{{ profesorSeleccionado ? 1 : totalProfesores }}</p>
            <p class="metric-description">{{ profesorSeleccionado ? 'Seleccionado' : 'Registrados' }}</p>
          </div>
        </div>
  
        <div class="metric-card">
          <div class="metric-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <div class="metric-content">
            <h3>Proyectos</h3>
            <p class="metric-value">{{ totalInventos }}</p>
            <p class="metric-description">{{ profesorSeleccionado ? 'Del profesor' : 'Totales' }}</p>
          </div>
        </div>
  
        <div class="metric-card">
          <div class="metric-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <div class="metric-content">
            <h3>Proyectos Vigentes</h3>
            <p class="metric-value">{{ proyectosVigentes }}</p>
            <p class="metric-description">En desarrollo</p>
          </div>
        </div>
  
        <div class="metric-card">
          <div class="metric-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <div class="metric-content">
            <h3>Promedio TRL</h3>
            <p class="metric-value">{{ promedioTRL.toFixed(1) }}</p>
            <p class="metric-description">Nivel tecnológico</p>
          </div>
        </div>
      </div>
  
      <div class="charts-container">
        <div class="chart-section">
          <h2>Nivel TRL por Proyecto</h2>
          <div class="chart-wrapper">
            <BarChart 
              :chart-data="graficoTRLData" 
              :options="chartOptions" 
              v-if="inventosFiltrados.length > 0"
            />
            <div v-else class="no-data">
              No hay datos para mostrar
            </div>
          </div>
        </div>
  
        <div class="chart-section">
          <h2>Indicadores Promedio</h2>
          <div class="chart-wrapper">
            <RadarChart 
              :chart-data="radarChartData" 
              :options="chartOptions" 
              v-if="inventosFiltrados.length > 0"
            />
            <div v-else class="no-data">
              No hay datos para mostrar
            </div>
          </div>
        </div>
      </div>
  
      <div class="projects-section" v-if="profesorSeleccionado">
        <h2>Proyectos de {{ profesorSeleccionado }}</h2>
        <div class="projects-grid">
          <div 
            v-for="(invento, index) in inventosFiltrados" 
            :key="index" 
            class="project-card"
          >
            <h3>{{ invento.titulo }}</h3>
            <p><strong>Investigador:</strong> {{ invento.investigador }}</p>
            <p><strong>TRL:</strong> <span class="badge" :class="'trl-' + invento.TRL">{{ invento.TRL }}</span></p>
            <p><strong>Financiamiento:</strong> {{ invento.financiamiento }}</p>
            <p><strong>Empresa:</strong> {{ invento.empresa_entidad }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import inventos from '@/data/inventos.json';
  import profesores from '@/data/profesores.json';
  import { defineComponent } from 'vue';
  import BarChart from '@/components/BarChart.vue';
  import RadarChart from '@/components/RadarChart.vue';
  
  export default defineComponent({
    name: 'Dashboard',
    components: { BarChart, RadarChart },
    data() {
      return {
        inventos,
        profesores,
        profesorSeleccionado: '',
        chartOptions: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              max: 9,
              ticks: {
                stepSize: 1
              }
            }
          }
        }
      };
    },
    computed: {
      inventosFiltrados() {
        if (!this.profesorSeleccionado) return this.inventos;
        
        // Buscar proyectos donde el investigador principal o colaboradores coincidan
        return this.inventos.filter(invento => {
          // Verificar si el profesor es el investigador principal
          const esInvestigadorPrincipal = invento.investigador.includes(this.profesorSeleccionado);
          
          // Verificar si el profesor es colaborador
          const esColaborador = invento.colaboradores.some(colab => 
            colab.includes(this.profesorSeleccionado)
          );
          
          return esInvestigadorPrincipal || esColaborador;
        });
      },
      totalProfesores() {
        return this.profesores.length;
      },
      totalInventos() {
        return this.inventosFiltrados.length;
      },
      proyectosVigentes() {
        if (!this.profesorSeleccionado) {
          return this.profesores.filter(p => p['Proyectos Vigentes']).length;
        }
        
        // Para un profesor específico, contar sus proyectos vigentes
        const profesor = this.profesores.find(p => p.nombre === this.profesorSeleccionado);
        return profesor && profesor['Proyectos Vigentes'] ? 1 : 0;
      },
      promedioTRL() {
        if (this.inventosFiltrados.length === 0) return 0;
        const sumaTRL = this.inventosFiltrados.reduce((sum, invento) => sum + invento.TRL, 0);
        return sumaTRL / this.inventosFiltrados.length;
      },
      graficoTRLData() {
        return {
          labels: this.inventosFiltrados.map(i => 
            i.titulo.length > 30 ? i.titulo.substring(0, 30) + '...' : i.titulo
          ),
          datasets: [{
            label: 'Nivel TRL',
            backgroundColor: '#4F46E5',
            borderColor: '#3730A3',
            borderWidth: 1,
            data: this.inventosFiltrados.map(i => i.TRL)
          }]
        };
      },
      radarChartData() {
        const total = this.inventosFiltrados.length;
        const sumas = this.inventosFiltrados.reduce((acc, invento) => {
          acc.TRL += invento.TRL;
          acc.CRL += invento.CRL;
          acc.BRL += invento.BRL;
          acc.FRL += invento.FRL;
          acc.IPRL += invento.IPRL;
          acc.TEAM += invento.TEAM;
          return acc;
        }, { TRL: 0, CRL: 0, BRL: 0, FRL: 0, IPRL: 0, TEAM: 0 });
  
        return {
          labels: ['TRL', 'CRL', 'BRL', 'FRL', 'IPRL', 'TEAM'],
          datasets: [{
            label: 'Promedios',
            backgroundColor: 'rgba(79, 70, 229, 0.2)',
            borderColor: '#4F46E5',
            pointBackgroundColor: '#4F46E5',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#4F46E5',
            data: total > 0 ? [
              sumas.TRL / total,
              sumas.CRL / total,
              sumas.BRL / total,
              sumas.FRL / total,
              sumas.IPRL / total,
              sumas.TEAM / total
            ] : [0, 0, 0, 0, 0, 0]
          }]
        };
      }
    }
  });
  </script>
  
  <style scoped>
  .dashboard-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }
  
  .dashboard-header {
    margin-bottom: 2rem;
    text-align: center;
  }
  
  .dashboard-title {
    font-size: 2rem;
    font-weight: 700;
    color: #1F2937;
    margin-bottom: 0.5rem;
  }
  
  .dashboard-subtitle {
    font-size: 1rem;
    color: #6B7280;
    margin-bottom: 1.5rem;
  }
  
  .filter-section {
    margin-top: 1.5rem;
  }
  
  .filter-section label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #4B5563;
  }
  
  .filter-select {
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    border: 1px solid #D1D5DB;
    background-color: white;
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
  }
  
  .metrics-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-bottom: 3rem;
  }
  
  .metric-card {
    background: white;
    border-radius: 0.5rem;
    padding: 1.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
  }
  
  .metric-icon {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    background-color: #EFF6FF;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1rem;
    flex-shrink: 0;
  }
  
  .metric-icon svg {
    width: 1.25rem;
    height: 1.25rem;
    color: #3B82F6;
  }
  
  .metric-content {
    flex: 1;
  }
  
  .metric-card h3 {
    font-size: 0.875rem;
    color: #6B7280;
    margin-bottom: 0.25rem;
  }
  
  .metric-value {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1F2937;
    margin-bottom: 0.25rem;
  }
  
  .metric-description {
    font-size: 0.75rem;
    color: #6B7280;
  }
  
  .charts-container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    margin-bottom: 3rem;
  }
  
  @media (min-width: 1024px) {
    .charts-container {
      grid-template-columns: 1fr 1fr;
    }
  }
  
  .chart-section {
    background: white;
    border-radius: 0.5rem;
    padding: 1.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  
  .chart-section h2 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1F2937;
    margin-bottom: 1rem;
  }
  
  .chart-wrapper {
    height: 300px;
    position: relative;
  }
  
  .no-data {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #6B7280;
    font-style: italic;
  }
  
  .projects-section {
    margin-bottom: 2rem;
  }
  
  .projects-section h2 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1F2937;
    margin-bottom: 1rem;
  }
  
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }
  
  .project-card {
    background: white;
    border-radius: 0.5rem;
    padding: 1.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  
  .project-card h3 {
    font-size: 1.125rem;
    font-weight: 600;
    color: #1F2937;
    margin-bottom: 0.75rem;
  }
  
  .project-card p {
    font-size: 0.875rem;
    color: #4B5563;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
  }
  
  .badge {
    display: inline-flex;
    align-items: center;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    font-weight: 600;
    margin-left: 0.5rem;
  }
  
  .trl-1 { background-color: #FEE2E2; color: #B91C1C; }
  .trl-2 { background-color: #FEE2E2; color: #B91C1C; }
  .trl-3 { background-color: #FEF3C7; color: #92400E; }
  .trl-4 { background-color: #FEF3C7; color: #92400E; }
  .trl-5 { background-color: #D1FAE5; color: #065F46; }
  .trl-6 { background-color: #D1FAE5; color: #065F46; }
  .trl-7 { background-color: #DBEAFE; color: #1E40AF; }
  .trl-8 { background-color: #DBEAFE; color: #1E40AF; }
  .trl-9 { background-color: #E0E7FF; color: #3730A3; }
  </style>