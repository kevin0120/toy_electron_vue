<template>

  <nav>
    <ul>
      <li>
        <router-link to="/page1">Home</router-link>
      </li>
      <li>
        <router-link to="/page2">About</router-link>
      </li>
    </ul>
  </nav>

  <router-view></router-view>
</template>

<style>
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  color: #fff;
  padding: 10px;
}

ul {
  display: flex;
  list-style: none;
}

li {
  margin-left: 20px;
}

a {
  text-decoration: none;
  color: #fff;
}

.active {
  font-weight: bold;
}

</style>

