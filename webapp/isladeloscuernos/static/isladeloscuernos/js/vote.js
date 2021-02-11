async function vote(id) {
    let data = new FormData()
    data.append('id', id);
    data.append('csrfmiddlewaretoken', document.querySelector('[name=csrfmiddlewaretoken]').value);
    let response = await fetch("/isladeloscuernos/vote/", {
        method: 'POST',
        body: data,
        credentials: 'same-origin',
    })
    response = await response.json()
    return response
}

const deleteAndDisplay = () => {
    document.getElementById("wrapper").style.display = 'none'
    document.getElementById("vote-success").style.display = 'block'
}

const generateChart = (xax, yax) =>{
    let data = [
        {
          x: xax,
          y: yax,
          type: 'bar'
        }
      ];

      let layout = {
        title: 'Votos de cada pareja',
        plot_bgcolor:"#e0e0e0",
        paper_bgcolor:"#e0e0e0",
        width: 0.9 * window.innerWidth,
        xaxis: {
            title: 'Parejas',
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
      
      Plotly.newPlot('votos', data, layout);
}

const generatePieChart = (lbls, vals) => {
    console.log(vals)
    let totalVotes = vals.reduce((total, current) => total + parseInt(current), 0)
    vals.forEach((val, index) => {
        vals[index] = (100*parseFloat(vals[index])/totalVotes).toFixed(2)
    })

    let data = [{
        values: vals,
        labels: lbls,
        textinfo: "label+percent",
        insidetextorientation: "radial",
        type: 'pie'
      }];

      let layout = {
        title: 'Porcentajes de cada pareja',
        plot_bgcolor:"#e0e0e0",
        paper_bgcolor:"#e0e0e0",
        width: 0.9 * window.innerWidth
    }
            
      Plotly.newPlot('votos-quesitos', data, layout);
}


let buttons = Array.from(document.getElementsByClassName("votar-btn"))
buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        if(confirm("¿Seguro que quieres votar a esta pareja?")){
            vote(e.target.id)
            .then(
                (response) => {
                    if(response.msg == 'ok') {
                        deleteAndDisplay()
                        let keys = Object.keys(response)
                        let values = Object.values(response)
                        keys.pop()
                        values.pop()
                        generateChart(keys, values)
                        generatePieChart(keys, values)
                    }
                }
            )
        }

    })
})


