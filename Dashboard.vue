<template>
  <div id="dashboardComponentID">
    <div id="updatedDate">Last updated: {{ updatedDate }}</div>
    <br />
    <div class="title">
      Overview
      <div class="row">
        <div class="col-sm-3">
          <div class="card">
            <div class="card-body text-primary">
              <h5 class="card-title">{{ total }}</h5>
              <h6 class="card-subtitle mb-2 text-muted">Total</h6>
            </div>
          </div>
        </div>
        <div class="col-sm-3">
          <div class="card">
            <div class="card-body text-danger">
              <h5 class="card-title">{{ active }}</h5>
              <h6 class="card-subtitle mb-2 text-muted">Active</h6>
            </div>
          </div>
        </div>
        <div class="col-sm-3">
          <div class="card">
            <div class="card-body text-success">
              <h5 class="card-title">{{ recovered }}</h5>
              <h6 class="card-subtitle mb-2 text-muted">Recovered</h6>
            </div>
          </div>
        </div>
        <div class="col-sm-3">
          <div class="card">
            <div class="card-body text-danger">
              <h5 class="card-title">{{ death }}</h5>
              <h6 class="card-subtitle mb-2 text-muted">Deaths</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br />

    <div class="title" style="float:left">
      {{ selectedCountry }}
      <div id="selectCountry" style="float:right">
      <div class="dropdown show">
        <a
          class="btn btn-secondary dropdown-toggle"
          href="#"
          role="button"
          id="dropdownMenuLink"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >Select Country</a>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a
            class="dropdown-item"
            href="#"
            v-for="country in countryList"
            v-on:click="setCountry(country)"
          >{{ country }}</a>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-sm-3">
      <div class="card">
        <div class="card-body text-primary">
          <h5 class="card-title">{{ totalIndia }}</h5>
          <h6 class="card-subtitle mb-2 text-muted">Total</h6>
        </div>
      </div>
    </div>
    <div class="col-sm-3">
      <div class="card">
        <div class="card-body text-danger">
          <h5 class="card-title">{{ activeIndia }}</h5>
          <h6 class="card-subtitle mb-2 text-muted">Active</h6>
        </div>
      </div>
    </div>
    <div class="col-sm-3">
      <div class="card">
        <div class="card-body text-success">
          <h5 class="card-title">{{ recoveredIndia }}</h5>
          <h6 class="card-subtitle mb-2 text-muted">Recovered</h6>
        </div>
      </div>
    </div>
    <div class="col-sm-3">
      <div class="card">
        <div class="card-body text-danger">
          <h5 class="card-title">{{ deathIndia }}</h5>
          <h6 class="card-subtitle mb-2 text-muted">Deaths</h6>
        </div>
      </div>
    </div>

    <br />
    <canvas id="myChart"></canvas>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {
      total: 6767,
      active: 6000,
      recovered: 700
    };
  }
};
</script>