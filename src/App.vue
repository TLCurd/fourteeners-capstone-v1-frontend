<template>
  <nav class="navbar sticky-top navbar-expand-lg  navbar-dark bg-dark justify-content-between">
    <a class="navbar-brand" href="/">CO 14ers</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <!-- <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" href="/peaks">Peaks</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/peaks/map">View the 14ers on a map |</a>
        </li> -->

        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
            aria-haspopup="true" aria-expanded="false">Colorado's Famed 14ers
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="/peaks">Browse your missions</a>
            <a class="dropdown-item" href="/peaks/map">View Peaks on Map</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="/logout">Log-out</a>
          </div>
        </li>

        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
            aria-haspopup="true" aria-expanded="false">Colorado's Recreation Areas
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="/rec_areas">Browse the Recreation Areas</a>
            <a class="dropdown-item" href="/rec_areas/map">View Recreation areas on Map</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="/logout">Log-out</a>
          </div>
        </li>


        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
            aria-haspopup="true" aria-expanded="false">Authentication
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="/signup">Join the crew!</a>
            <a class="dropdown-item" href="/login">Sign-in</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="/logout">Log-out</a>
          </div>
        </li>
        <!-- <li class="nav-item">
          <a class="nav-link" href="/rec_areas">Colorado Recreation Areas</a>
        </li> -->
      </ul>
      <form class="form-inline">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>
    </div>
  </nav>

  <router-view />
</template>

  <style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  /* color: #2c3e50; */
}

/* nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
