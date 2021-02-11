window.currentid = 1
const showOne = () => {
    let solteros = Array.from(document.getElementsByClassName("pareja-container"))
    solteros.forEach((soltero) => {
        if(soltero.id != "soltero-1"){
            soltero.style.display = "none"
        }
        
    })
}

const reject = () => {
    let buttons = Array.from(document.getElementsByClassName("reject-btn"))
    buttons.forEach((button) => {
        button.addEventListener("click", (e) => {
            document.getElementById(`soltero-${window.currentid}`).style.display = "none"
            window.currentid = (window.currentid + 1)%(buttons.length + 1)
            window.currentid == 0 ? window.currentid = 1 : window.currentid = window.currentid
            document.getElementById(`soltero-${window.currentid}`).style.display = "flex"
        })
        
    })
}

async function vote(id, route) {
    let data = new FormData()
    data.append('id', id);
    data.append('csrfmiddlewaretoken', document.querySelector('[name=csrfmiddlewaretoken]').value);
    let response = await fetch(`/isladeloscuernos/${route}/`, {
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
        title: 'Votos de cada soltero',
        plot_bgcolor:"#e0e0e0",
        paper_bgcolor:"#e0e0e0",
        width: 0.9 * window.innerWidth,
        xaxis: {
            title: 'Solteros',
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
        title: 'Porcentajes de cada soltero',
        plot_bgcolor:"#e0e0e0",
        paper_bgcolor:"#e0e0e0",
        width: 0.9 * window.innerWidth
    }
            
      Plotly.newPlot('votos-quesitos', data, layout);
}

const voteRequest = () => {
    let buttons = Array.from(document.getElementsByClassName("vote-btn"))
    buttons.forEach((button) => {
        button.addEventListener("click", (e) => {
            if(confirm("¿Seguro que quieres votar a este solero?")){
                let title = document.getElementById("solteros-h1").innerText
                console.log(title)
                let route = ""
                title == "Solteros" ? route = "votesoltero" : route = "votesoltera"
                vote(e.target.id, route).then((res) => {
                    if(res.msg == "ok"){
                        console.log("Bien!")
                        let keys = Object.keys(res)
                        let values = Object.values(res)
                        keys.pop()
                        values.pop()
                        deleteAndDisplay()
                        generateChart(keys, values)
                        generatePieChart(keys, values)
                    }
                    
                })
            }
        })
    })
}


showOne()
reject()
voteRequest()