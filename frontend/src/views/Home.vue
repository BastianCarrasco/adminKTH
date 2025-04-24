<template>
    <div class="home-container">
        <header class="home-header">
            <h1 class="home-title">Bienvenido a la Aplicación Educativa</h1>
            <p class="home-subtitle">Gestión integral del proceso educativo</p>
        </header>

        <div class="modules-grid">
            <router-link to="/dashboard" class="module-card">
                <div class="module-icon">📊</div>
                <h3>Dashboard</h3>
                <p>Visualiza los datos principales del sistema</p>
            </router-link>

            <router-link to="/profesores" class="module-card">
                <div class="module-icon">👨‍🏫</div>
                <h3>Profesores</h3>
                <p>Gestiona la información del personal docente</p>
            </router-link>

            <router-link to="/inventos" class="module-card">
                <div class="module-icon">🔬</div>
                <h3>Inventos</h3>
                <p>Administra los proyectos y materiales</p>
            </router-link>

            <router-link to="/cuestionario" class="module-card">
                <div class="module-icon">📝</div>
                <h3>Cuestionario</h3>
                <p>Accede a las evaluaciones y formularios</p>
            </router-link>
        </div>
    </div>
</template>

<style scoped>
.home-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
}

.home-header {
    text-align: center;
    margin-bottom: 3rem;
}

.home-title {
    color: #42b883;
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
}

.home-subtitle {
    color: #64748b;
    font-size: 1.2rem;
}

.modules-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
}

.module-card {
    background: #1e1e1e; /* Fondo oscuro */
    border-radius: 12px;
    padding: 1.5rem;
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    color: white;
    text-decoration: none;
    box-shadow: 0 0 0 rgba(0, 255, 0, 0); /* sin brillo por defecto */
    border: 1px solid transparent;
}

.module-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 0 20px rgba(0, 255, 0, 0.5); /* Brillo verde */
    border: 1px solid rgba(0, 255, 0, 0.6); /* Borde con color verde */
    cursor: pointer;
}

.module-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
}

.module-card h3 {
    color: #42b883;
    margin-bottom: 0.5rem;
    font-size: 1.3rem;
}

.module-card p {
    color: #d1d5db;
    font-size: 0.95rem;
    line-height: 1.5;
}

@media (max-width: 768px) {
    .home-title {
        font-size: 2rem;
    }

    .modules-grid {
        grid-template-columns: 1fr;
    }
}
</style>
