<script>
  import StationsMap from "./lib/StationsMap.svelte";
  import { activeCountry } from "./lib/general";
  import { activeRiver } from "./lib/general";
  import { activeCity } from "./lib/general";
  import { topoCountries } from "./lib/topo";
  import { topoRivers } from "./lib/topo";
  import { next_r } from "./lib/general";
  import { next_c } from "./lib/general";
  import { next_ct } from "./lib/general";
  import { next } from "./lib/general";
  import * as d3 from "d3";
  import world from "./assets/world.json";
  import allCities from "./assets/cities.json";

  $: next_country = null;
  $: next_river = null;
  $: next_city = null;
  $: message = "Klicke auf folgendes Land: ";
  $: countrySelection = "all";
  $: riverSelection = "topo";
  $: citySelection = "topo";
  
  var countries = d3.map(world.features, (d) => d["properties"]["name_de"]);
  var cities = d3.map(allCities.features, (d) => d["properties"]["name"]);

  function randomName() {
    var i = Math.floor(Math.random()*3);
    if(i == 0) {
      return "country";
    }else if(i == 1) {
      return "river";
    }else if(i == 2) {
      return "city";
    }
  }

  next.set(randomName());

  setMessage();

  function setMessage() {
    if($next == "country") {
      message = "Klicke auf folgendes Land: ";
    }else if($next == "river") {
     message = "Klicke auf folgenden Fluss: "
    }else if($next == "city") {
      message = "Klicke auf folgende Stadt";
    }
  }

  function newName() {
    if (countrySelection == "all" && $next == "country") {
      next_country = countries[Math.floor(Math.random() * countries.length)];
      next_c.set(next_country);
    }else if($next == "country" && countrySelection == "topo") {
      next_country = topoCountries[Math.floor(Math.random() * topoCountries.length)];
      next_c.set(next_country);
    }else if($next == "country" && countrySelection == "none") {
      next_country == "";
      next_c.set(next_country);
      next.set(randomName());
      newName();
      setMessage();
    }else{
      next_country = "";
      next_c.set(next_country);
    }
    if (riverSelection == "topo" && $next == "river") {
      next_river = topoRivers[Math.floor(Math.random() * topoRivers.length)];
      next_r.set(next_river);
    } else if($next == "river" && riverSelection == "none") {
      next_river = "";
      next_r.set(next_river);
      next.set(randomName());
      newName();
      setMessage();
    }else {
      next_river = "";
      next_r.set(next_river);
    }
    if (citySelection == "topo" && $next == "city") {
      next_city = cities[Math.floor(Math.random() * cities.length)];
      next_ct.set(next_city);
    } else if($next == "city" && citySelection == "none") {
      next_city = "";
      next_ct.set(next_city);
      next.set(randomName());
      newName();
      setMessage();
    }else {
      next_city = "";
      next_ct.set(next_city);
    }
  }

  // set next_country
  $: if (countrySelection == "all") {
    next.set(randomName());
    newName();
    setMessage();
  }else {
    next.set(randomName());
    newName();
    setMessage();
  }

  //set next_river
  $: if (riverSelection == "topo") {
    next.set(randomName());
    newName();
    setMessage();
  } else {
    next.set(randomName());
    newName();
    setMessage();
  }

  // set next_city
  $: if (citySelection == "topo") {
    next.set(randomName());
    newName();
    setMessage();
  }else {
    next.set(randomName());
    newName();
    setMessage();
  }

  //check if next_country = true
  $: if (next_country == $activeCountry) {
    next.set(randomName());
    newName();
    setMessage();
  }

  //check if next_river = true
  $: if (next_river == $activeRiver) {
    next.set(randomName());
    newName();
    setMessage();
  }

  //check if next_river = true
  $: if (next_city == $activeCity) {
    next.set(randomName());
    newName();
    setMessage();
  }

  $: style = "none";
  function openSettingsMenu() {
    style = "flex";
  }

  function closeSettingsMenu() {
    style = "none";
  }

  // $: coordinates = "";
  // var map = null;
  // var canDraw = false;

  // $: if($activeMap != map) {
  //   coordinates = "";
  // }

  // function draw(event) {
  //   if(canDraw) {
  //     if(coordinates == "")  {
  //       coordinates = event.clientX + " " + event.clientY;
  //       map = $activeMap;
  //     }else {
  //       coordinates = coordinates + "," + event.clientX + " " + event.clientY;
  //     }
  //   }
  // }

  // function drawbyClick(event) {
  //   if(coordinates == "")  {
  //     coordinates = event.clientX + " " + event.clientY;
  //     map = $activeMap;
  //   }else {
  //     coordinates = coordinates + "," + event.clientX + " " + event.clientY;
  //   }
  // }

</script>

<body style="margin: 0; background-color:cornflowerblue;">
  <main class="flex flex-row p-2 w-screen h-screen">
    <section id="map" class="h-full" style="flex-grow: 2;">
      <StationsMap/>
    </section>
    <section
      id="text"
      class="h-full"
      style="padding-right: 5%; padding-left: 2%; background-color: #ffffff; right:0;"
    >
      <img
        id="settings"
        src="src/assets/settings.png"
        alt=""
        on:click|stopPropagation={() => openSettingsMenu()}
      />
      <h2 style="margin-top: 80px;">{message}</h2>
      {#if next_country != ""}
        <h1>{next_country}</h1>
      {/if}
      {#if next_river != ""}
        <h1>{next_river}</h1>
      {/if}
      {#if next_city != ""}
        <h1>{next_city}</h1>
      {/if}
    </section>
    <div
      id="menu"
      style="display: {style}; justify-content: center; align-items: center;"
      on:click|stopPropagation={() => closeSettingsMenu()}
    >
      <div
        style="width: 40%; height: 40%; background-color: #ffffff; z-index: 10; border: 1.5px solid #222222; border-radius: 5px;"
        on:click|stopPropagation={null}
      >
        <h2 style="margin-top: 10px; margin-left:10px;">Einstellungen:</h2>
        <h3 style="margin-left: 10px; margin-top: 7px;">Länder:</h3>
        <form style="margin-left: 10px; display: flex; flex-direction: column;">
          <select
            bind:value={countrySelection}
            class="w-full"
            style="border-radius: 3px; font-size: 12px; margin-top: 7px; max-width: 180px;"
          >
            <option value="all">Alle Länder</option>
            <option value="topo">Nur für Topo</option>
            <option value="none">Nichts</option>
          </select>
        </form>
        <h3 style="margin-left: 10px; margin-top: 7px;">Flüsse:</h3>
        <form style="margin-left: 10px; display: flex; flex-direction: column;">
          <select
            bind:value={riverSelection}
            class="w-full"
            style="border-radius: 3px; font-size: 12px; margin-top: 7px; max-width: 180px;"
          >
            <option value="topo">Nur für Topo</option>
            <option value="none">Nichts</option>
          </select>
        </form>
        <h3 style="margin-left: 10px; margin-top: 7px;">Städte:</h3>
        <form style="margin-left: 10px; display: flex; flex-direction: column;">
          <select
            bind:value={citySelection}
            class="w-full"
            style="border-radius: 3px; font-size: 12px; margin-top: 7px; max-width: 180px;"
          >
            <option value="topo">Nur für Topo</option>
            <option value="none">Nichts</option>
          </select>
        </form>
      </div>
    </div>
    <!-- <div id="draw" class="{$activeType}" on:mousemove={draw} on:click={drawbyClick} on:mousedown={() => canDraw = true} on:mouseup={() => canDraw = false}>
      <svg width="100%" height="100%" style="position: absolute;">
        <polyline points="{coordinates}" stroke="red" fill="none"></polyline>
      </svg>
    </div> -->
  </main>
</body>

<style>
  body,
  main {
    overflow-y: hidden;
    overflow-x: hidden;
    margin: 0;
    padding: 0;
  }

  /* h4 {
    font-size: 12px;
  } */

  h3 {
    font-size: 15px;
  }

  h2 {
    font-size: 16px;
  }

  #settings {
    width: 30px;
    position: absolute;
    right: 20px;
    top: 20px;
    transition: 100ms;
  }

  #settings:hover {
    cursor: pointer;
    transition: 100ms;
    transform: scale(1.2);
  }

  #menu {
    position: absolute;
    z-index: 9;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.494);
  }

  #settings{
    z-index: 5;
  }

  /* #draw.draw{
    position: absolute;
    z-index: 4;
    width: 100%;
    height: 100%;
  }

  #draw.draw:hover{
    cursor: url(assets/drawingCursor.png) 0 16, auto;
  } */
</style>
