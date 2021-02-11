const generateChart = (xax, yax, titulo, placement, xaxlabel) => {
    let data = [
        {
            x: xax,
            y: yax,
            type: 'bar'
        }
    ];

    let layout = {
        title: titulo,
        plot_bgcolor: "#e0e0e0",
        paper_bgcolor: "#e0e0e0",
        width: 0.9 * window.innerWidth,
        xaxis: {
            title: xaxlabel,
            titlefont: {
                size: 14,
                color: '#7f7f7f'
            },
        },
        yaxis: {
            title: 'Votos',
            titlefont: {
                size: 14,
                color: '#7f7f7f'
            },
        }
    }

    Plotly.newPlot(placement, data, layout);
}

const generatePieChart = (lbls, vals, titulo, placement) => {
    console.log(vals)
    let totalVotes = vals.reduce((total, current) => total + parseInt(current), 0)
    vals.forEach((val, index) => {
        vals[index] = (100 * parseFloat(vals[index]) / totalVotes).toFixed(2)
    })

    let data = [{
        values: vals,
        labels: lbls,
        textinfo: "label+percent",
        insidetextorientation: "radial",
        type: 'pie'
    }];

    let layout = {
        title: titulo,
        plot_bgcolor: "#e0e0e0",
        paper_bgcolor: "#e0e0e0",
        width: 0.9 * window.innerWidth
    }

    Plotly.newPlot(placement, data, layout);
}


async function requestData() {
    let response = await fetch(`/isladeloscuernos/getstats/`, {
        method: 'GET',
        credentials: 'same-origin',
    })
    response = await response.json()
    return response
}


requestData().then((response) => {
    console.log(response["solteras"])
    let keys = Object.keys(response["parejas"])
    let values = Object.values(response["parejas"])
    generateChart(keys, values, 'Votos de cada Pareja', 'votos', 'Parejas de la isla')
    generatePieChart(keys, values, '% De votos de cada pareja', 'votos-quesitos')
    console.log("Ploted")

    keys = Object.keys(response["solteros"])
    values = Object.values(response["solteros"])
    generateChart(keys, values, 'Votos de cada Soltero', 'votos-solteros', 'Solteros de la isla')
    generatePieChart(keys, values, '% De votos de cada Soltero', 'votos-solteros-quesitos')

    keys = Object.keys(response["solteras"])
    values = Object.values(response["solteras"])
    generateChart(keys, values, 'Votos de cada Soltera', 'votos-solteras', 'Solteras de la isla')
    generatePieChart(keys, values, '% De votos de cada Soltera', 'votos-solteras-quesitos')
})