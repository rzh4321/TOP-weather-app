
async function get_data() {
    try {
        const response = await fetch('https://api.weatherapi.com/v1/current.json?key=69ebdce0bd7c44ba98102952230106&q=london', {mode: 'cors'});
        const data = await response.json();
        console.log(data);
        return data;
    }
    catch (e) {
        throw "Please enter a valid location";
    }


}

async function process_data() {
    try {
        let data = await get_data();
        let city = data.location.name;
        let country = data.location.country;
        let temp_c = data.current.temp_c;
        let temp_f = data.current.temp_f;
        let feelslike_c = data.current.feelslike_c;
        let feelslike_f = data.current.feelslike_f;
        let humidity = data.current.humidity;
        console.log([city, country])
    }
    catch (error_msg) {
        console.log(error_msg);
    }
}

process_data();