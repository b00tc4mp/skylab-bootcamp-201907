function WeatherItem({weather:{currently:{temperature,icon}},country}){
    let a=temperature
    let b=(a-32)*5/9
    if(country==undefined) country="Barcelona"
    if(country=="gb") country="London"
    if(country=="de") country="Berlin"
    if(country=="fr") country="Paris"
    if(country=="us") country="New York"

    return <>
        <section className="weather">
             <h3 >{country}: {b.toFixed(1)}°C</h3>
            {icon==="clear-day" && <i className="far fa-sun"></i>}
            {icon==="rain" && <i className="fas fa-cloud-showers-heavy"></i>}
            {icon==="wind" && <i className="fas fa-wind"></i>}
            {icon==="cloudy" && <i className="fas fa-cloud"></i>}
            {icon==="partly-cloudy-day" && <i className="fas fa-cloud-sun"></i>}
        </section>
  

    </>
}

