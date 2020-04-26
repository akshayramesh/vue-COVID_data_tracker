Vue.component('dashboard', {
    template:
        `
            <div id="dashboardComponentID">
            <div id="updatedDate">
               Last updated: {{ updatedDate }}
            </div>
            <br>
            <div class="title"> Overview 
            <div class="row">
              <div class="col-sm-3">
                <div class="card">
                  <div class="card-body text-primary">
                    <h5 class="card-title">{{ total }}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Confirmed</h6>
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
            <br>
            <canvas style="margin-top:2rem" id="myChart"></canvas>
            <hr style="margin-bottom:3rem">
            <div class="title"> {{ selectedCountry }}
            <div id="selectCountry">
            <div class="dropdown show">
            <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Select Country
          </a>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a class="dropdown-item" href="javascript:void();" v-for="country in countryValues" v-on:click="setCountry(country)">{{ country.description }}</a>
                    
                </div>
                </div>
                </div>
                
               
            </div>
            <div class="row">
              <div class="col-sm-3">
                <div class="card">
                  <div class="card-body text-primary">
                    <h5 class="card-title">{{ countryConfirmed }}</h5>
                    <h6 class="card-subtitle mb-2 text-muted"> Confirmed </h6>
                  </div>
                </div>
              </div>
             
              <div class="col-sm-3">
                <div class="card">
                  <div class="card-body text-success">
                    <h5 class="card-title">{{ countryRecovered }}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Recovered</h6>
                  </div>
                </div>
              </div>
              <div class="col-sm-3">
              <div class="card">
                <div class="card-body text-danger">
                  <h5 class="card-title">{{ countryDeaths }}</h5>
                  <h6 class="card-subtitle mb-2 text-muted">Deaths</h6>
                </div>
              </div>
            </div>
         
            <br>
            <hr>
            <br>
            


          </div>
        
        `,
    data: function () {
        return {
            updatedDate: "25 April, 2020",
            total: 6767,
            active: 6000,
            recovered: 700,
            death: 67,
            totalIndia: 30,
            activeIndia: 28,
            recoveredIndia: 2,
            deathIndia: 0,
            countryList: ['India', 'US', 'Italy', 'Spain'],
            countryValues: [{
                'key': 'IN',
                'description': 'India'
            },
            {
                'key': 'US',
                'description': 'United States'
            },
            {
                'key': 'ES',
                'description': 'Spain'
            },
            {
                'key': 'IT',
                'description': 'Italy'
            }],
            selectedCountry: '',
            dataByCountry: [{
                "country": "India",
                "total": 30,
                "active": 28,
                "recovered": 2,
                "death": 0
            },
            {
                "country": "Spain",
                "total": 120,
                "active": 110,
                "recovered": 2,
                "death": 8
            },
            {
                "country": "USA",
                "total": 5000,
                "active": 4500,
                "recovered": 490,
                "death": 10
            },
            ],
            dailyData: [],
            c: [],
            d: [],
            dates: [],
            countryConfirmed: '',
            countryRecovered: '',
            countryDeaths: ''
        }
    },
    mounted() {
        console.log("mounted");
        let that = this
        $.ajax({
            url: "https://covid19.mathdro.id/api",
            type: "GET",
            success: function (data) {
                that.total = data.confirmed.value;
                that.recovered = data.recovered.value
                that.death = data.deaths.value
            },
            error: function (error) {
                console.log(error);
            }
        })

        $.ajax({
            url: "https://covid19.mathdro.id/api/daily",
            type: "GET",
            success: function (data) {
                data.forEach(x => {
                    let a = {
                        "confirmed": x.totalConfirmed,
                        "death": x.deaths.total,
                        "date": x.reportDate
                    }
                    that.dailyData.push(a)
                });

                    that.dailyData.forEach(x => {
                        that.c.push(parseInt(x.confirmed))
                        that.d.push(parseInt(x.death))
                        that.dates.push(x.date)

                    });

                    var ctx = document.getElementById('myChart').getContext('2d');

                    var chart = new Chart(ctx, {
                        // The type of chart we want to create
                        type: 'line',
            
                        // The data for our dataset
                        data: {
                            labels: that.dates,
                            datasets: [{
                                label: 'Confirmed',
                                fill: false,
                                borderColor: 'rgb(255, 99, 132)',
                                data: that.c
                            },
                           
                            {
                                label: 'Deaths',
                                fill: false,
                                borderColor: 'rgb(255, 0, 255)',
                                data: that.d
                            }]
            
                        },
            
                        // Configuration options go here
                        options: {}
                    });
                    that.setCountry({'key': 'IN', 'description': 'India'})
              
            },
            error: function (error) {
                console.log(error)
            }
        })
       

      
    },

    methods: {
        setCountry: function (country) {
            this.selectedCountry = country.description;
            let that = this
            let url = 'https://covid19.mathdro.id/api/countries/' + country.key
            $.ajax({
                url: url,
                type: "GET",
                success: function (data) {
                    that.countryConfirmed = data.confirmed.value
                    that.countryRecovered = data.recovered.value
                    that.countryDeaths = data.deaths.value
                },
                error: function (error) {
                    console.log(error);
                }
            })

           // let a = this.dataByCountry.find(x => x.country === this.selectedCountry)
           
        },
        refreshData: function () {
            console.log("mounted");
            
            $.ajax({
                url: "https://covid19.mathdro.id/api",
                type: "GET",
                success: function (data) {
                    console.log(data);
                },
                error: function (error) {
                    console.log(error);
                }
            })
        }
    }
}
)

new Vue({
    el: '#app',
    mounted: function () {
        console.log("mounted app")
    }
})



