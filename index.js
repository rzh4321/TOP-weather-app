
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

    let display_location = document.createElement('span');
    display_location.textContent = `${city}, ${country}`;

    let temp = create_temp_div(temp_f, temp_c);


    results.append(display_location, temp);

}

function create_temp_div(temp_f, temp_c) {
    let temp_div = document.createElement('div');
    let temp = document.createElement('span');
    temp.textContent = `${temp_f}° F`;
    let change_unit = document.createElement('button');
    change_unit.classList.add('change-unit');
    change_unit.textContent = 'Show celsius';

    change_unit.addEventListener('click', (e) => {
        if (change_unit.textContent == 'Show celsius') {
            change_units(temp, change_unit, temp_c, 'c');
        }
        else {
            change_units(temp, change_unit, temp_f, 'f');
        }
    })

    temp_div.append(temp, change_unit)
    temp_div.classList.add('flex');
    temp_div.style.gap = '20px';
    return temp_div;
}

function change_units(temp, change_unit, new_temp, unit) {
    if (unit == 'c') {
        temp.textContent = `${new_temp}° C`;
        change_unit.textContent = 'Show farenheit';
    }
    else {
        temp.textContent = `${new_temp}° F`;
        change_unit.textContent = 'Show celsius';
    }
}

const main = document.querySelector('.main');
const search_button = document.querySelector('.search');
const inp = search_button.previousElementSibling;
const results = document.querySelector('.results');


search_button.addEventListener('click', (e) => {
    e.preventDefault();
    if (check_validity()) {
        let data = get_data(inp.value);
        clear_results();
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

function clear_results() {
    for (let elem of results.children) {
        elem.remove();
    }
}