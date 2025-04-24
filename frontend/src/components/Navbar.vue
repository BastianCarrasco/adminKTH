<template>
    <nav class="navbar">
        <div class="navbar-brand">
            <span class="vue-icon">V</span>
            <span class="app-name">EduApp</span>
        </div>
        <div class="nav-links">
            <router-link to="/" class="nav-link" exact-active-class="active-link">Inicio</router-link>
            <router-link to="/dashboard" class="nav-link" active-class="active-link">Dashboard</router-link>
            <router-link to="/profesores" class="nav-link" active-class="active-link">Profesores</router-link>
            <router-link to="/inventos" class="nav-link" active-class="active-link">Inventos</router-link>
            <router-link to="/cuestionario" class="nav-link" active-class="active-link">Cuestionario</router-link>
        </div>
    </nav>
</template>

<style scoped>
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.8rem 2rem;
    background: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border-bottom: 3px solid #42b883;
}

.navbar-brand {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: bold;
}

.vue-icon {
    display: inline-block;
    width: 24px;
    height: 24px;
    background-color: #42b883;
    color: white;
    border-radius: 4px;
    text-align: center;
    line-height: 24px;
    font-weight: bold;
}

.app-name {
    color: #35495e;
    font-size: 1.2rem;
}

.nav-links {
    display: flex;
    gap: 1.5rem;
}

.nav-link {
    color: #35495e;
    text-decoration: none;
    font-weight: 500;
    padding: 0.5rem 0;
    position: relative;
    transition: color 0.3s ease;
}

.nav-link:hover {
    color: #42b883;
}

.nav-link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: #42b883;
    transition: width 0.3s ease;
}

.nav-link:hover::after {
    width: 100%;
}

.active-link {
    color: #42b883;
    font-weight: 600;
}

.active-link::after {
    width: 100%;
}

@media (max-width: 768px) {
    .navbar {
        flex-direction: column;
        padding: 1rem;
    }
    
    .nav-links {
        margin-top: 1rem;
        flex-wrap: wrap;
        justify-content: center;
    }
}
</style>