<template>
  <div id="app">
    <!-- Header -->
    <header class="app-header">
      <div class="container">
        <div class="header-content">
          <div class="logo">
            <h1>📦 Import Transaction Manager</h1>
            <p>Streamlined Import Management & Compliance Tracking</p>
          </div>
          <div class="user-info">
            <span class="user-role">Import Operations Manager</span>
            <div class="user-avatar">👤</div>
          </div>
        </div>
      </div>
    </header>

    <!-- Navigation -->
    <nav class="main-nav">
      <div class="container">
        <div class="nav-items">
          <router-link to="/" class="nav-item" exact-active-class="active">
            <span class="nav-icon">🏠</span>
            <span>Dashboard</span>
          </router-link>
          <router-link to="/transactions" class="nav-item" active-class="active">
            <span class="nav-icon">📋</span>
            <span>Transactions</span>
          </router-link>
          <router-link to="/file-manager" class="nav-item" active-class="active">
            <span class="nav-icon">📁</span>
            <span>File Manager</span>
          </router-link>
          <router-link to="/permits" class="nav-item" active-class="active">
            <span class="nav-icon">📄</span>
            <span>Permits & OGA</span>
          </router-link>
          <router-link to="/kpi-dashboard" class="nav-item" active-class="active">
            <span class="nav-icon">📊</span>
            <span>KPI Dashboard</span>
          </router-link>
          <router-link to="/logs" class="nav-item" active-class="active">
            <span class="nav-icon">📝</span>
            <span>Transaction Logs</span>
          </router-link>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="main-content">
      <div class="container">
        <router-view />
      </div>
    </main>

    <!-- Footer -->
    <footer class="app-footer">
      <div class="container">
        <p>&copy; 2024 Import Transaction Manager - Compliance & Efficiency Focused</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/* Global styles are imported from assets/styles.css */
</style>