
async function get_data(inp) {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=69ebdce0bd7c44ba98102952230106&q=${inp}`, {mode: 'cors'});
        const data = await response.json();
        console.log(data);
        return data;
    }
    catch (e) {
        throw "No matches found";
    }


}

function process_data(data) {
    let city = data.location.name;
    let country = data.location.country;
    let temp_c = data.current.temp_c;
    let temp_f = data.current.temp_f;
    let feelslike_c = data.current.feelslike_c;
    let feelslike_f = data.current.feelslike_f;
    let humidity = data.current.humidity;
    console.log([city, country])
}

let search_button = document.querySelector('.search');
const inp = search_button.previousElementSibling;


search_button.addEventListener('click', (e) => {
    e.preventDefault();
    if (check_validity()) {
        let data = get_data(inp.value);
        data.then(process_data(data));
        data.catch((e) => display_no_matches(e));
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

function display_no_matches() {
    
}

process_data();