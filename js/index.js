
const inputBox = document.querySelector(".input__box")
const tableBody = document.querySelector(".table-body")
const tableContainer = document.querySelector(".table__container")
let exitAmount

// SETUP LOGIG

const stages = ["stage-1", "stage-2", "stage-3", "stage-4", "stage-5", "stage-6"]

for(let stage of stages){

const resultContainer = document.createElement("div");
resultContainer.className = `${stage}`
tableContainer.append(resultContainer)

}




// Exit Amount input Event Listeners
inputBox.onblur = (e) =>{
    exitAmount = e.target.value
    stageOne(exitAmount)
    stageTwo(exitAmount)
    const formated = formatTodecimal(exitAmount)
    //console.log(formated)
    inputBox.value = formated
}

inputBox.onfocus = (e) => {
    exitAmount = e.target.value
    const reformated = formatToInt(exitAmount)

    inputBox.value = reformated
}

// Format Input Functionality
function formatTodecimal (_exitAmount){
    
    let formatedAmount = new Intl.NumberFormat('de-DE', {
        maximumSignificantDigits: 2
      }).format(_exitAmount)
    //console.log(formatedAmount)
    return formatedAmount
}
function formatToInt (_exitAmount){
    //let exitAmount = e.target.value
    const reformatedAmount = _exitAmount.replaceAll('.','')
    console.log(reformatedAmount)

    return reformatedAmount
}



// GET DATA FROM TABLE ELEMENTS
const investData = []
for(let i= 0; i < tableBody.rows.length; i++){
    let value =parseFloat( tableBody.rows[i].cells[1].innerHTML.replace("%", ''))
    let investorClass = tableBody.rows[i].cells[0].innerHTML
   // console.log(typeof(value))
    //console.log(value)
    investData.push({investorClass, value})
}

//console.log(investData)





// STAGE-1 LOGIC
const stageOne = (_exitAmount) => {
    const stageOneContainer = document.querySelector(".stage-1")
    stageOneContainer.innerHTML=''
    const stageOneData = []
    for(let data of investData){
        const dataCol = document.createElement("li")
        let {investorClass, value} = data;
        value = formatTodecimal( Math.round(_exitAmount * (value / 100)))
        //console.log(investorClass, value)
        // problem
        stageOneContainer.append(dataCol);
        dataCol.innerHTML = `${investorClass}: €${value}`

    }
}

const stageTwo = (_exitAmount) => {
    const stageOneContainer = document.querySelector(".stage-2")
    stageOneContainer.innerHTML=''

    const euroFormatter = new Intl.NumberFormat('de-DE')
    const investedAmount = 18000000;

    _exitAmount = Number(_exitAmount)
    console.log(typeof(investedAmount))
    const gain = _exitAmount - investedAmount
   console.log("gain total: ", gain)


   
    const stageOneData = []
    for(let data of investData){
        const dataCol = document.createElement("li")
        let {investorClass, value} = data;

        const gainPerInvestor = formatTodecimal( gain * (value/100))
        const investmentPerInvestor = investedAmount * (value / 100)
        //console.log("total gain per investor: ", gainPerInvestor + investmentPerInvestor)

        console.log("gain per investor: ",gainPerInvestor)
        //console.log("investment per investor: ",investmentPerInvestor)
        console.log(" ")
        //value = formatTodecimal( Math.round(_exitAmount * (value / 100)))
        //console.log(investorClass, value)
        // problem
        //stageOneContainer.append(dataCol);
        //dataCol.innerHTML = `${investorClass}: €${value}`

    }
}

/**
 * 
 * 
 * 
 * inputBox.addEventListener("blur", formatTodecimal)
inputBox.addEventListener("focus", formatToInt)


function formatTodecimal (e){
    exitAmount = e.target.value
    stageOne(exitAmount)
    let formatedAmount = new Intl.NumberFormat('de-DE').format(e.target.value)
    console.log(formatedAmount)

    inputBox.value = formatedAmount
}
function formatToInt (e){
    let exitAmount = e.target.value
    const reformated = exitAmount.replaceAll('.','')
    console.log(reformated)

    inputBox.value = reformated
}
 */