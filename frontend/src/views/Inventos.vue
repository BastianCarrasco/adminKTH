<template>
    <div class="home-container">
   
  
      <section class="inventos-section">
        <div class="filters-container">
          <h2 class="section-title">Inventos</h2>
          
          <div class="filter-controls">
            <div class="filter-group">
              <label style="color: white;" for="titulo-filter">Nombre del Invento</label>
              <input 
                id="titulo-filter" 
                v-model="filters.titulo" 
                type="text" 
                placeholder="Filtrar por nombre..."
                class="filter-input"
              >
            </div>
            
            <div class="filter-group">
              <label style="color: white;" for="investigador-filter">Investigador</label>
              <input 
                id="investigador-filter" 
                v-model="filters.investigador" 
                type="text" 
                placeholder="Filtrar por investigador..."
                class="filter-input"
              >
            </div>
            
            <div class="filter-group">
              <label style="color: white;" for="colaborador-filter">Colaborador</label>
              <input 
                id="colaborador-filter" 
                v-model="filters.colaborador" 
                type="text" 
                placeholder="Filtrar por colaborador..."
                class="filter-input"
              >
            </div>
            
            <div class="filter-group">
              <label style="color: white;" for="financiamiento-filter">Financiamiento</label>
              <select 
                id="financiamiento-filter" 
                v-model="filters.financiamiento" 
                class="filter-select"
              >
                <option value="">Todos</option>
                <option v-for="(fin, index) in financiamientosUnicos" :key="index" :value="fin">
                  {{ fin }}
                </option>
              </select>
            </div>
            
            <button @click="resetFilters" class="reset-button">
              Limpiar Filtros
            </button>
          </div>
        </div>
        
        <div class="inventos-grid">
          <div 
            v-for="(invento, index) in inventosFiltrados" 
            :key="index" 
            class="invento-card"
          >
            <div class="invento-header">
              <h3 class="invento-title">{{ invento.titulo }}</h3>
              <div class="investigador-chip">
                <svg xmlns="http://www.w3.org/2000/svg" class="user-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                </svg>
                {{ invento.investigador }}
              </div>
            </div>
  
            <div class="invento-body">
              <div class="info-item">
                <span class="info-label">Colaboradores:</span>
                <span class="info-value">{{ invento.colaboradores.join(', ') }}</span>
              </div>
              
              <div class="info-item">
                <span class="info-label">Invención:</span>
                <span class="info-value">{{ invento.invenciones }}</span>
              </div>
              
              <div class="info-item">
                <span class="info-label">Financiamiento:</span>
                <span class="info-value">{{ invento.financiamiento }}</span>
              </div>
              
              <div class="info-item">
                <span class="info-label">Industria/Disciplina:</span>
                <span class="info-value">{{ invento.industria_disciplina }}</span>
              </div>
              
              <div class="info-item">
                <span class="info-label">Empresa/Entidad:</span>
                <span class="info-value">{{ invento.empresa_entidad }}</span>
              </div>
            </div>
  
            <div class="invento-footer">
              <div class="metric-badges">
                <div class="metric-badge" v-for="(value, key) in getMetrics(invento)" :key="key">
                  <span class="metric-label">{{ key }}:</span>
                  <span class="metric-value" :class="'metric-' + key.toLowerCase()">{{ value }}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div v-if="inventosFiltrados.length === 0" class="no-results">
            <svg xmlns="http://www.w3.org/2000/svg" class="no-results-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3>No se encontraron resultados</h3>
            <p>Intenta ajustar los filtros de búsqueda</p>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  import inventos from '@/data/inventos.json';
  
  export default {
    name: 'Home',
    data() {
      return {
        inventos,
        filters: {
          titulo: '',
          investigador: '',
          colaborador: '',
          financiamiento: ''
        }
      };
    },
    computed: {
      financiamientosUnicos() {
        const financiamientos = new Set();
        this.inventos.forEach(invento => {
          if (invento.financiamiento) {
            financiamientos.add(invento.financiamiento);
          }
        });
        return Array.from(financiamientos).sort();
      },
      inventosFiltrados() {
        return this.inventos.filter(invento => {
          const tituloMatch = invento.titulo.toLowerCase().includes(this.filters.titulo.toLowerCase());
          const investigadorMatch = invento.investigador.toLowerCase().includes(this.filters.investigador.toLowerCase());
          const colaboradorMatch = this.filters.colaborador === '' || 
            invento.colaboradores.some(colab => 
              colab.toLowerCase().includes(this.filters.colaborador.toLowerCase())
            );
          const financiamientoMatch = this.filters.financiamiento === '' || 
            invento.financiamiento === this.filters.financiamiento;
          
          return tituloMatch && investigadorMatch && colaboradorMatch && financiamientoMatch;
        });
      }
    },
    methods: {
      getMetrics(invento) {
        return {
          TRL: invento.TRL,
          CRL: invento.CRL,
          BRL: invento.BRL,
          FRL: invento.FRL,
          IPRL: invento.IPRL,
          TEAM: invento.TEAM
        };
      },
      resetFilters() {
        this.filters = {
          titulo: '',
          investigador: '',
          colaborador: '',
          financiamiento: ''
        };
      }
    }
  };
  </script>
  
  <style scoped>
  .home-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }
  
  .home-header {
    text-align: center;
    margin-bottom: 3rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid #e2e8f0;
  }
  
  .main-title {
    color: #2c3e50;
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }
  
  .subtitle {
    color: #64748b;
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }
  
  .dashboard-link {
    display: inline-flex;
    align-items: center;
    padding: 0.75rem 1.5rem;
    background-color: #42b883;
    color: white;
    text-decoration: none;
    border-radius: 6px;
    font-weight: 500;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .dashboard-link:hover {
    background-color: #3aa876;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
  
  .icon {
    width: 1.25rem;
    height: 1.25rem;
    margin-left: 0.5rem;
  }
  
  .inventos-section {
    margin-top: 2rem;
  }
  
  .filters-container {
    margin-bottom: 2rem;
  }
  
  .section-title {
    color: #ffffff;
    font-size: 1.75rem;
    margin-bottom: 1.5rem;
  }
  
  .filter-controls {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
    margin-bottom: 1.5rem;
    align-items: end;
  }
  
  .filter-group {
    display: flex;
    flex-direction: column;
  }
  
  .filter-group label {
    font-size: 0.875rem;
    color: #4a5568;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  
  .filter-input, .filter-select {
    padding: 0.5rem 0.75rem;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    font-size: 0.875rem;
    transition: border-color 0.2s;
  }
  
  .filter-input:focus, .filter-select:focus {
    outline: none;
    border-color: #42b883;
    box-shadow: 0 0 0 2px rgba(66, 184, 131, 0.2);
  }
  
  .reset-button {
    padding: 0.5rem 1rem;
    background-color: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    color: #4a5568;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .reset-button:hover {
    background-color: #edf2f7;
    border-color: #cbd5e0;
  }
  
  .inventos-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 1.5rem;
  }
  
  .invento-card {
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: 1px solid #e2e8f0;
  }
  
  .invento-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  }
  
  .invento-header {
    padding: 1.25rem 1.5rem;
    background-color: #f8fafc;
    border-bottom: 1px solid #e2e8f0;
  }
  
  .invento-title {
    color: #2c3e50;
    font-size: 1.25rem;
    margin-bottom: 0.75rem;
  }
  
  .investigador-chip {
    display: inline-flex;
    align-items: center;
    background-color: #e2e8f0;
    color: #4a5568;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.875rem;
  }
  
  .user-icon {
    width: 1rem;
    height: 1rem;
    margin-right: 0.5rem;
    color: #718096;
  }
  
  .invento-body {
    padding: 1.5rem;
  }
  
  .info-item {
    display: flex;
    margin-bottom: 0.75rem;
    line-height: 1.5;
  }
  
  .info-label {
    font-weight: 600;
    color: #4a5568;
    min-width: 150px;
    flex-shrink: 0;
  }
  
  .info-value {
    color: #2d3748;
  }
  
  .invento-footer {
    padding: 1rem 1.5rem;
    background-color: #f8fafc;
    border-top: 1px solid #e2e8f0;
  }
  
  .metric-badges {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  .metric-badge {
    background-color: white;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    padding: 0.25rem 0.75rem;
    font-size: 0.75rem;
    display: flex;
    align-items: center;
  }
  
  .metric-label {
    font-weight: 600;
    color: #718096;
    margin-right: 0.25rem;
  }
  
  .metric-value {
    font-weight: 700;
  }
  
  .metric-trl { color: #4299e1; }
  .metric-crl { color: #9f7aea; }
  .metric-brl { color: #ed8936; }
  .metric-frl { color: #48bb78; }
  .metric-iprl { color: #f56565; }
  .metric-team { color: #667eea; }
  
  .no-results {
    grid-column: 1 / -1;
    text-align: center;
    padding: 3rem;
    color: #718096;
  }
  
  .no-results-icon {
    width: 3rem;
    height: 3rem;
    margin-bottom: 1rem;
    color: #cbd5e0;
  }
  
  @media (max-width: 768px) {
    .main-title {
      font-size: 2rem;
    }
    
    .filter-controls {
      grid-template-columns: 1fr;
    }
    
    .inventos-grid {
      grid-template-columns: 1fr;
    }
    
    .info-item {
      flex-direction: column;
    }
    
    .info-label {
      margin-bottom: 0.25rem;
    }
  }
  </style>