<script>
import profesores from '../DATA/profesores.json';

export default {
  name: 'ProfesoresView',
  data() {
    return {
      listaProfesores: profesores,
      filtro: '',
      profesorSeleccionado: null
    }
  },
  computed: {
    profesoresFiltrados() {
      return this.listaProfesores.filter(profesor => 
        profesor.nombre.toLowerCase().includes(this.filtro.toLowerCase()) ||
        profesor.titulo.toLowerCase().includes(this.filtro.toLowerCase()) ||
        profesor.LI.toLowerCase().includes(this.filtro.toLowerCase())
      );
    }
  },
  methods: {
    seleccionarProfesor(profesor) {
      this.profesorSeleccionado = profesor;
    },
    cerrarDetalle() {
      this.profesorSeleccionado = null;
    }
  }
}
</script>

<template>
  <div class="profesores-container">
    <h1 class="titulo-principal">Investigadores y Docentes</h1>
    
    <div class="filtro-container">
      <input 
        v-model="filtro" 
        type="text" 
        placeholder="Buscar por nombre, proyecto o área..." 
        class="input-filtro"
      >
    </div>
    
    <div class="profesores-grid">
      <div 
        v-for="profesor in profesoresFiltrados" 
        :key="profesor.nombre" 
        class="profesor-card"
        @click="seleccionarProfesor(profesor)"
      >
        <div class="profesor-header">
          <h2>{{ profesor.nombre }}</h2>
          <p class="titulo-investigacion">{{ profesor.titulo }}</p>
        </div>
        
        <div class="profesor-body">
          <p><strong>Áreas de interés:</strong> {{ profesor.LI }}</p>
          <p><strong>Cargo:</strong> {{ profesor.cargo || 'No especificado' }}</p>
        </div>
        
        <div class="profesor-footer">
          <span class="badge" v-if="profesor['Proyectos Vigentes']">Proyectos activos</span>
          <span class="badge" v-if="profesor['Apoyos FIN']">{{ profesor['Apoyos FIN'] }}</span>
        </div>
      </div>
    </div>
    
    <!-- Modal de detalle -->
    <div v-if="profesorSeleccionado" class="modal-overlay" @click.self="cerrarDetalle">
      <div class="modal-content">
        <button class="close-button" @click="cerrarDetalle">×</button>
        
        <div class="modal-header">
          <h2>{{ profesorSeleccionado.nombre }}</h2>
          <p class="titulo-investigacion">{{ profesorSeleccionado.titulo }}</p>
        </div>
        
        <div class="modal-body">
          <div class="info-row">
            <div class="info-column">
              <h3>Información Académica</h3>
              <p><strong>Pregrado:</strong> {{ profesorSeleccionado.Pregrado }}</p>
              <p><strong>Postgrado:</strong> {{ profesorSeleccionado.Postgrado }}</p>
            </div>

            <div class="foto-container" v-if="profesorSeleccionado.foto">
  <img :src="profesorSeleccionado.foto" alt="Foto del profesor" class="foto-profesor" />
</div>

            
            <div class="info-column">
              <h3>Contacto</h3>
              <p><strong>Email:</strong> {{ profesorSeleccionado.Correo }}</p>
              <p><strong>Teléfono:</strong> {{ profesorSeleccionado.fono }}</p>
            </div>
          </div>
          
          <div class="info-row">
            <div class="info-column">
              <h3>Proyectos</h3>
              <p><strong>Vigentes:</strong> {{ profesorSeleccionado['Proyectos Vigentes'] || 'No especificado' }}</p>
              <p><strong>Finalizados:</strong> {{ profesorSeleccionado['Proyectos Finalizados'] || 'No especificado' }}</p>
            </div>
            
            <div class="info-column">
              <h3>Áreas de Investigación</h3>
              <p>{{ profesorSeleccionado.LI }}</p>
            </div>
          </div>
          
          <div v-if="profesorSeleccionado['Otros Cargos']" class="info-full">
            <h3>Otros Cargos</h3>
            <p>{{ profesorSeleccionado['Otros Cargos'] }}</p>
          </div>
        </div>
        
        <div class="modal-footer">
          <p class="actualizacion">Última actualización: {{ profesorSeleccionado['Ultima Actualizacion'] }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profesores-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.titulo-principal {
  color: #ffffff;
  text-align: center;
  margin-bottom: 2rem;
  border-bottom: 2px solid #42b883;
  padding-bottom: 1rem;
}

.filtro-container {
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
}

.input-filtro {
  width: 100%;
  max-width: 600px;
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.profesores-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.profesor-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  padding: 1.5rem;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  border-left: 4px solid #42b883;
}

.profesor-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}

.profesor-header {
  margin-bottom: 1rem;
}

.profesor-header h2 {
  color: #2c3e50;
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.titulo-investigacion {
  color: #42b883;
  font-style: italic;
  font-size: 0.9rem;
}

.profesor-body {
  margin-bottom: 1rem;
}

.profesor-body p {
  margin: 0.5rem 0;
  color: #555;
  font-size: 0.9rem;
}

.profesor-footer {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.badge {
  background-color: #e0f7fa;
  color: #00796b;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 8px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 2rem;
  position: relative;
  box-shadow: 0 4px 20px rgba(0,0,0,0.2);
  color: black;
}

.close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #777;
}

.modal-header {
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
}

.modal-header h2 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.info-row {
  display: flex;
  gap: 2rem;
  margin-bottom: 1.5rem;
}

.info-column {
  flex: 1;
}

.info-full {
  width: 100%;
}

.info-row h3 {
  color: #42b883;
  font-size: 1rem;
  margin-bottom: 0.75rem;
  border-bottom: 1px dashed #ddd;
  padding-bottom: 0.25rem;
}

.modal-footer {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
  text-align: right;
}

.actualizacion {
  font-size: 0.8rem;
  color: #777;
}

.foto-container {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.foto-profesor {
  max-width: 150px;
  max-height: 150px;
  border-radius: 8px;
  object-fit: cover;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .profesores-grid {
    grid-template-columns: 1fr;
  }
  
  .info-row {
    flex-direction: column;
    gap: 1rem;
  }
  
  .modal-content {
    width: 95%;
    padding: 1.5rem;
  }
}
</style>