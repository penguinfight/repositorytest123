<script>
  import * as d3 from "d3";
  import world from "../assets/world.json";
  import north_america from "../assets/north_america.json";
  import south_america from "../assets/south_america.json";
  import europe from "../assets/europe.json";
  import asia from "../assets/asia.json";
  import africa from "../assets/africa.json";
  import rivers from "../assets/rivers.json";
  import cities from "../assets/cities.json";
  import { activeCountry } from "./general.js";
  import { activeRiver } from "./general.js";
  import { activeCity } from "./general.js";
  import { activeMap } from "./general.js";
  import { next_r } from "./general.js";
  import { next_c } from "./general.js";
  import { next_ct } from "./general.js";
  import { topoRivers } from "./topo.js";
  export let padding = 10;

  $: mapSelection = "world";
  $: activeMap.set(mapSelection);

  $: countryPath = "";
  $: riverPath = "";
  $: cityCircle = "";

  $: if($next_c != "") {
    countryPath = "active";
  }else {
    countryPath = "";
  }

  $: if($next_r != "") {
    riverPath = "active";
  }else {
    riverPath = "";
  }

  $: if($next_ct != "") {
    cityCircle = "active";
  }else {
    cityCircle = "";
  }

  $: projection = null;

  $: if (mapSelection == "north_america") {
    projection = d3.geoMercator().fitExtent(
      [
        [padding, padding],
        [width - padding, height - padding],
      ],
      north_america
    );
  } else if (mapSelection == "south_america") {
    projection = d3.geoMercator().fitExtent(
      [
        [padding, padding],
        [width - padding, height - padding],
      ],
      south_america
    );
  } else if (mapSelection == "africa") {
    projection = d3.geoMercator().fitExtent(
      [
        [padding, padding],
        [width - padding, height - padding],
      ],
      africa
    );
  } else if (mapSelection == "europe") {
    projection = d3.geoMercator().fitExtent(
      [
        [padding, padding],
        [width - padding, height - padding],
      ],
      europe
    );
  } else if (mapSelection == "asia") {
    projection = d3.geoMercator().fitExtent(
      [
        [padding, padding],
        [width - padding, height - padding],
      ],
      asia
    );
  } else {
    projection = d3.geoMercator().fitExtent(
      [
        [padding, padding],
        [width - padding, height - padding],
      ],
      world
    );
  }

  let width = 0;
  let height = 0;

  $: path = d3.geoPath(projection);
</script>

<div class="w-full h-full" bind:clientWidth={width} bind:clientHeight={height}>
  <form style="position: absolute; left: 30px; top: 20px;">
    <select bind:value={mapSelection} class="w-full" style="border-radius: 3px;">
      <option value="world">World</option>
      <option value="north_america">North America</option>
      <option value="south_america">South America</option>
      <option value="asia">Asia</option>
      <option value="europe">Europe</option>
      <option value="africa">Africa</option>
    </select>
  </form>
  <svg class="w-full h-full">
    {#each world.features as feature (feature.properties.name)}
      <path
        class="state {countryPath}"
        d={path(feature)}
        stroke="black"
        fill="none"
        on:click|stopPropagation={() =>
          activeCountry.set(
            $activeCountry === feature.properties.name_de ? null : feature.properties.name_de
          )}
      />
    {/each}
    {#each rivers.features as feature}
      {#if topoRivers.includes(feature.properties.RIVER_MAP)}
        <path class="river {riverPath}" d={path(feature)} stroke="blue" fill="none" on:click|stopPropagation={() =>
          activeRiver.set(
            $activeRiver === feature.properties.RIVER_MAP ? null : feature.properties.RIVER_MAP
          )}/>
      {/if}
    {/each}
    {#each cities.features as feature}
      <circle
        id="cities"
        class="{cityCircle}"
        cx={projection(feature.geometry.coordinates)[0]}
        cy={projection(feature.geometry.coordinates)[1]}
        fill="red"
        stroke="none"
        r={3.5}
        on:click|stopPropagation={() =>
          activeCity.set(
            $activeCity === feature.properties.name ? null : feature.properties.name
          )}
      />
    {/each}
  </svg>
</div>

<style>
  path.state {
    fill: #35cc7b;
    stroke: #222222;
  }

  path.state.active:hover {
    cursor: pointer;
    fill: #219fff;
    stroke: rgb(58, 0, 158);
  }

  path.river.active:hover {
    cursor: pointer;
  }

  form{
    z-index: 5;
  }

  circle.active:hover{
    cursor: pointer;
    fill: #219fff;
    stroke: rgb(58, 0, 158);
  }
</style>
