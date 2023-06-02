const main = document.querySelector('.main');
const search_button = document.querySelector('.search');
const inp = search_button.previousElementSibling;
const results = document.getElementById('results');


search_button.addEventListener('click', (e) => {
    e.preventDefault();
    if (check_validity()) {
        results.innerHTML = '';
        let data = get_data(inp.value);
        data.then((obj) => {
            if (obj.error) {
                display_no_matches(obj.error.message)
            }
            else {
                display_data(obj);
            }
        })
    }
})




async function get_data(inp) {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=69ebdce0bd7c44ba98102952230106&q=${inp}`, {mode: 'cors'});
    const data = await response.json();
    console.log(data);
    return data;
}

function display_data(data) {
    let city = data.location.name;
    let country = data.location.country;
    let temp_c = data.current.temp_c;
    let temp_f = data.current.temp_f;
    let feelslike_c = data.current.feelslike_c;
    let feelslike_f = data.current.feelslike_f;
    let humidity = data.current.humidity;
    console.log([city, country])
    let temps = [temp_f, temp_c, feelslike_f, feelslike_c];

    let location = display_location(city, country);
    let temp = create_temp_div(temps);
    let humidity_div = create_humidity(humidity);
    let feelslike_div = create_feelslike(feelslike_f);


    results.append(location, temp, humidity_div, feelslike_div);
}

function create_feelslike(temp) {
    let div = document.createElement('div');
    div.id = 'feelslike';
    div.textContent = `Feels like: ${temp}° F`;
    return div;
}

function create_humidity(humidity) {
    let div = document.createElement('div');
    div.textContent = `Humidity: ${humidity}`;
    return div;
}

function display_location(city, country) {
    let display_location = document.createElement('span');
    display_location.textContent = `${city}, ${country}`;
    return display_location;
}

function create_temp_div(temps) {
    let temp_div = document.createElement('div');
    let temp = document.createElement('span');
    let [temp_f, temp_c] = temps
    temp.textContent = `${temp_f}° F`;
    let change_unit = document.createElement('button');
    change_unit.classList.add('change-unit');
    change_unit.textContent = 'Show celsius';

    change_unit.addEventListener('click', (e) => {
        if (change_unit.textContent == 'Show celsius') {
            change_units(temp, change_unit, temps, 'c');
        }
        else {
            change_units(temp, change_unit, temps, 'f');
        }
    })

    temp_div.append(temp, change_unit)
    temp_div.classList.add('flex');
    temp_div.style.gap = '20px';
    return temp_div;
}

function change_units(temp, change_unit, temps, unit) {
    let [temp_f, temp_c, feelslike_f, feelslike_c] = temps;
    let feelslike = document.getElementById('feelslike');
    // change feels like
    if (unit == 'c') {
        temp.textContent = `${temp_c}° C`;
        change_unit.textContent = 'Show farenheit';
        feelslike.textContent = `Feels like: ${feelslike_c}° C`
    }
    else {
        temp.textContent = `${temp_f}° F`;
        change_unit.textContent = 'Show celsius';
        feelslike.textContent = `Feels like: ${feelslike_f}° F`

    }
}

function check_validity() {
    const form = document.querySelector('form');
    const error_message = form.lastElementChild;
    error_message.style.width = form.getBoundingClientRect().width + 'px';
    if (inp.validity.valueMissing) {
        error_message.textContent = "This field is required";
        error_message.classList.add('active');
        inp.classList.add('invalid');
    }
    else {
        error_message.textContent = "";
        error_message.classList.remove('active');
        inp.classList.remove('invalid');
    }
    return form.checkValidity();
}

function display_no_matches(error_message) {
    let msg = document.createElement('span');
    msg.textContent = error_message;
    msg.style.color = 'red';
    results.append(msg);
}
