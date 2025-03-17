const base_url = 'https://api.apilayer.com/fixer';

fetch(`${base_url}/symbols`, {
    headers: {
        apikey: api_key
    }
})
    .then(response => response.json())
    .then(({symbols}) => {
        const currencies = Object.keys(symbols);
        currencies.forEach(currency => {
            const option = document.createElement("option");
            option.value = currency;
            option.text = currency;
            to.append(option);
            from.append(new Option(currency, currency));
        })
    })

convert.onclick = () => {
    fetch(`${base_url}/convert?from=${from.value.trim()}&to=${to.value.trim()}&amount=${sum.value.trim()}`, {
        headers: {
            apikey: api_key
        }
    })
        .then(response => response.json())
        .then(data => data.result)
        .then(res => {
            const h1 = document.createElement('h1');
            h1.append(`Result: ${res.toFixed(2)}`);
            if (result.firstElementChild) {
                result.replaceChild(h1, result.firstElementChild);
            } else {
                result.append(h1);
            }
        })
        .catch(e => {
            const h1 = document.createElement('h1');
            h1.append(`Error`);
            if (result.firstElementChild) {
                result.replaceChild(h1, result.firstElementChild);
            } else {
                result.append(h1);
            }
        })
}
