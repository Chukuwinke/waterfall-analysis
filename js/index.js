import currency from "currency.js"
import { allStages } from "./stagesData"
const inputBox = document.querySelector(".input__box")
const tableBody = document.querySelector(".table-body")
const tableContainer = document.querySelector(".table__container")
const resultSection = document.createElement("div")
const saveFileBtn = document.getElementById("saveFileBtn")
tableContainer.append(resultSection)

let exitAmount
let newExit;

// SETUP LOGIG

/////////////////////////////////////////////////////////////////////////////////////////////////
const newStageOne = (_stage) =>{
   // const newExit = "60000000"

    const {owners, stage} = _stage
     //tableContainer.append(resultContainer)
    calculateRes(owners, newExit, stage, newExit);
    
}


/////////////////////////////////////////////////////////////////////////////////
const newStageTwo = (_stage) =>{

    //const newExit = "25000000"
    const gains = newExit - "18000000"


    const {owners, stage} = _stage
    calculateRes(owners, gains, stage, newExit);
}

/////////////////////////////////////////////////////////////////////////////////////////// PROBLEM BEGIN

const newStageThree = (_stage) =>{
    //const newExit = "35000000"
    const gains = newExit - "18000000"

    //console.log(currency(gains).format())

    const {owners, stage} = _stage

    calculateRes(owners, gains, stage, newExit);
    
}
////////////////////////////////////////////////////////////////////////////////////////// PROBLEM END
/////////////////////////////////////////////////////////////////////////////////////////// PROBLEM BEGIN
const newStageFour = (_stage) =>{

    //const newExit = "45000000"
    let totalInvested = "19200000"
    let gains = newExit - totalInvested


   
    const {owners, stage} = _stage

    calculateRes(owners, gains, stage, newExit);

}


//FUNCTIONALITY FOR FINDING INVESTORS WITH COMMON PREFFRENCE
const findCommons = (_owners, _gains) =>{

    const liqUn = _owners.filter(owner => owner.liqPref == "common")
    //console.log(liqUn)

    const investorPrefsRes = []
    for(let owner of liqUn){
        //console.log(currency(_gains))
        let {seniority, ownerPercent, investedAmount, investor} = owner

        const result = EURO(((ownerPercent/100)* _gains))

        //console.log(currency(ownerReturn, { symbol: '€', decimal: ',', separator: '.' }).format())

        investorPrefsRes.push({seniority, investor, result})

    }
    return investorPrefsRes
}

// FUNCTIONALITY FOR FINDING CAPED INVESTORS
const findCap = (_owners, _gains) => {
    const capOwners =_owners.filter(owner => owner.cap > 0)
   

    const capedInvestorsResults = []
    for(let capOwner of capOwners){
        const {seniority, investor, ownerPercent, investedAmount} = capOwner
        //console.log(capOwner.cap)
        let result = ((ownerPercent/100)* _gains) + (investedAmount * 1000000)
        const capResult = (investedAmount * 2) * 1000000

        if(result > capResult){
            result = capResult
        }
         result = EURO(result)
        //gains = gains - result;
        console.log(result)
        capedInvestorsResults.push({seniority, investor, result})
    }
    return capedInvestorsResults
}

// FUNCTIONALITY FOR FINDING INVESTORS WITH PARTICIPATING PREFRENCE
const findLiqPref = (_owners, _gains) =>{
    const liqUn = _owners.filter(owner => owner.liqPref == "participation-uncap" && owner.cap == 0)
    //console.log(liqUn)

    
    //console.log(fracdArray)
    const investorPrefsRes = []
    for(let owner of liqUn){
        //console.log(currency(_gains))
        let {seniority, ownerPercent, investedAmount, investor} = owner
    
        

        const result =EURO(((ownerPercent/100)* _gains) + (investedAmount * 1000000))
       
        //console.log(currency(ownerReturn, { symbol: '€', decimal: ',', separator: '.' }).format())

        investorPrefsRes.push({seniority, investor, result})

    }
    return investorPrefsRes
}

const addResults = (_data, stage, _newExit) =>{
    //console.log(stage)
    //resultSection.innerHTML = ""

    // creating the result card and appending it to the dom
    const resultContainer = document.createElement("div");
     resultContainer.className = `${stage} container`
     resultSection.append(resultContainer)

    // creating the delete button and 
    const deleteBtn = document.createElement("button");
    const id = randomId()
    deleteBtn.id = id
    deleteBtn.innerHTML = 'X'
    resultContainer.append(deleteBtn)
    deleteBtn.onclick = () =>{
        resultContainer.remove()
        console.log(content.find(item => item.id == id))
        const x = content.find(item => item.id == id)
        content.splice(content.indexOf(x), 1)

        console.log(content)

    }

     _newExit = `Exit Amount: ${EURO(_newExit)}`
     //content.push(...[`id:${id}`, stage,_newExit])

     
     const investorReturns = []
     for(let item of _data){
         let {investor, ownerPercent, investedPercent, result} = item;
         const dataCol = document.createElement("li")
         resultContainer.append(dataCol);
         const investorContent = `${investor}: ${result}`
         dataCol.innerHTML = investorContent
        investorReturns.push(investorContent)
     }
     content.push({id, stage,_newExit, investorReturns})
     //console.log(investordataPck)
     console.log(content)
 }

 const calculateRes = (_owners, _gains, _stage, _newExit) => {

    let mockExit = _newExit
    const convertedCommonsResults = findCommons(_owners, _gains)
    const capedInvestorsResults = findCap(_owners, _gains)
    const liqPrefrenceResults = findLiqPref(_owners, _gains)

    // CREATE A FUNCTION THAT ALLOWS YOU TO GO THROUGH EACH INVESTOR RESULT SUBTRACT RESULT FOR EACH ITEM FROM THE GAINS
    // BY ORDER OF SENIORITY 
    const combined = [...capedInvestorsResults,...liqPrefrenceResults, ...convertedCommonsResults]
    for(let x of combined){
        const {result:{value}} = x

        mockExit = mockExit - value
        console.log("current inv: ",value)
        console.log("mocKExit: ",mockExit)
    }
    console.log("final remainder: ", mockExit)
    //const sumPlusInitial = combined.reduce((prev, current) => prev.result.add(current.result), 0)

    //console.log(sumPlusInitial)
    combined.sort((a,b) => sortHelper(a.seniority,b.seniority))
    console.log(combined)

    //adding result to screen
    addResults(combined, _stage, _newExit)

 }
/**
 * 
 * const calculateRes = (_owners, _gains, _stage, _newExit) => {

    let mockExit = _newExit
    const convertedCommonsResults = findCommons(_owners, _gains)
    const capedInvestorsResults = findCap(_owners, _gains)
    const liqPrefrenceResults = findLiqPref(_owners, _gains)

    // CREATE A FUNCTION THAT ALLOWS YOU TO GO THROUGH EACH INVESTOR RESULT SUBTRACT RESULT FOR EACH ITEM FROM THE GAINS
    // BY ORDER OF SENIORITY 
    const combined = [...capedInvestorsResults,...liqPrefrenceResults, ...convertedCommonsResults]
    for(let x of combined){
        const {result:{value}} = x

        mockExit = mockExit - value
        console.log("current inv: ",value)
        console.log("mocKExit: ",mockExit)
    }
    console.log("final remainder: ", mockExit)
    //const sumPlusInitial = combined.reduce((prev, current) => prev.result.add(current.result), 0)

    //console.log(sumPlusInitial)
    combined.sort((a,b) => sortHelper(a.seniority,b.seniority))
    console.log(combined)

    //adding result to screen
    addResults(combined, _stage, _newExit)

 }
 */









 const saveFile = (_content) =>{
    console.log("works")

    const data_string = JSON.stringify(_content, null, "\n")
    let file = new Blob([data_string], {type:"text"})
    let anchor = document.createElement('a')
    anchor.href = URL.createObjectURL(file)

    anchor.download = "result.txt"
    anchor.click()
 }

//////////////////////////////////////// HELPER FUNCTIONS /////////////////////////////////////////////////////
const sortHelper = (a,b)=>a>b?1:a<b?-1:0;
let randomId = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
  }

const EURO = value => currency(value, { symbol: '€', decimal: ',', separator: '.' }).format();
/////////////////////////////////////////////////////////////////////////////////////////// PROBLEM BEGIN

/////////////////////////////////////////////////////////////////////////////////////////


// logic for adding results to screen
const content = []

for(let stage of allStages){
    const newStage = stage.stage
    const createStageBtn = document.createElement("button")
    createStageBtn.innerHTML = `Create ${newStage} Data`
    createStageBtn.className = `${newStage}__btn`

    tableBody.append(createStageBtn)

    createStageBtn.onclick = (e) =>{
        

        switch(newStage) {
            case "stage-1":
                newStageOne(stage)
              break;
            case "stage-2":
                newStageTwo(stage)
              break;
            case "stage-3":
                newStageThree(stage)
              break;
            case "stage-4":
                newStageFour(stage)
              break;
            default:
              console.log("error no stages match")
          }

    }
     
    
    
    console.log(content)
        //console.log(investorClass, value)
        // problem
    
    saveFileBtn.onclick = () => saveFile(content)

}















const stages = ["stage-1", "stage-2", "stage-3", "stage-4", "stage-5", "stage-6"]

// for(let stage of stages){

// const resultContainer = document.createElement("div");
// resultContainer.className = `${stage}`
// tableContainer.append(resultContainer)

// }

inputBox.onchange = (e) =>{
    console.log(e.target.value)
    newExit = e.target.value
}


// Exit Amount input Event Listeners
inputBox.onblur = (e) =>{
    exitAmount = e.target.value
    //stageOne(exitAmount)
    //stageTwo(exitAmount)
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
    //console.log(reformatedAmount)

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

    const investedAmount = 18000000;

    const gain = _exitAmount - investedAmount
   //console.log("gain total: ", gain)


   
    const stageOneData = []
    for(let data of investData){
        const dataCol = document.createElement("li")
        let {investorClass, value} = data;
        let gainPerInvestor;
        let investmentPerInvestor;

        if(investorClass == "Founders"){
             gainPerInvestor = formatTodecimal( gain * (value/100))
             investmentPerInvestor = 0
        }
         gainPerInvestor = formatTodecimal( gain * (value/100))
         investmentPerInvestor = investedAmount * (value / 100)
        //console.log("total gain per investor: ", gainPerInvestor + investmentPerInvestor)

        //console.log("gain per investor: ",gainPerInvestor)
        //console.log("investment per investor: ",investmentPerInvestor)
        //console.log(" ")
        //value = formatTodecimal( Math.round(_exitAmount * (value / 100)))
        //console.log(investorClass, value)
        // problem
        //stageOneContainer.append(dataCol);
        //dataCol.innerHTML = `${investorClass}: €${value}`

    }
}

//console.log(currency(18000000.00 * (5/100)).format())



















/**
 * const currency = require("currency.js")

const inputBox = document.querySelector(".input__box")
const tableBody = document.querySelector(".table-body")
const tableContainer = document.querySelector(".table__container")

let exitAmount

// SETUP LOGIG

const allStages = [
    {stage:"stage-1",
        owners:[
            {seniority:1, investor:"Founders", ownerPercent:33.33, investedPercent:33.33, liqPref:"common", cap:0},
            {seniority:1, investor:"InvestorA", ownerPercent:6.67, investedPercent:6.67, liqPref:"common", cap:0},
            {seniority:1, investor: "InvestorB", ownerPercent:10, investedPercent:10, liqPref:"common", cap:0},
            {seniority:1, investor: "InvestorC", ownerPercent:50, investedPercent:50, liqPref:"common", cap:0},
        ]
    },
    {stage:"stage-2",
        owners:[
            {seniority:1, investor:"Founders", ownerPercent:33.33, investedAmount:0, liqPref:"common", cap:0, liqPref:"common", cap:0},
            {seniority:1, investor:"InvestorA", ownerPercent:6.67, investedAmount:0.9, liqPref:"common", cap:0, liqPref:"common", cap:0},
            {seniority:1, investor: "InvestorB", ownerPercent:10, investedAmount:2.1, liqPref:"common", cap:0, liqPref:"common", cap:0},
            {seniority:1, investor: "InvestorC", ownerPercent:50, investedAmount:15, liqPref:"common", cap:0, liqPref:"common", cap:0},
            ]
    },
    {stage:"stage-3",
        owners:[
            {seniority:1, investor:"Founders", ownerPercent:33.33, investedAmount:0, liqPref:"common", cap:0},
            {seniority:1, investor:"InvestorA", ownerPercent:6.67, investedAmount:0.9, liqPref:"common", cap:0},
            {seniority:1, investor: "InvestorB", ownerPercent:10, investedAmount:2.1, liqPref:"common", cap:0},
            {seniority:1, investor: "InvestorC", ownerPercent:50, investedAmount:15, liqPref:"common", cap:0},
            ]
    },
    {stage:"stage-4",
        owners:[
            {seniority:1, investor:"Founders", ownerPercent:37.04, investedAmount:0, liqPref:"common", cap:0},
            {seniority:2, investor:"InvestorA", ownerPercent:7.41, investedAmount:0.9, liqPref:"common", cap:0},
            {seniority:3, investor: "InvestorB", ownerPercent:10, investedAmount:2.1, liqPref:"participation-cap", cap:2},
            {seniority:4, investor: "InvestorC", ownerPercent:55.56, investedAmount:15, liqPref:"participation-uncap", cap:0},
            ]
    },
    // {stage:"stage-5",
    //  founder: [{ownerPercent:33.33, investedPercent:33.33}],
    //  InvestorA: [{ownerPercent:6.67, investedPercent:6.67}],
    //  InvestorB: [{ownerPercent:10, investedPercent:10}],
    //  InvestorB: [{ownerPercent:50, investedPercent:50}],
    // },
    // {stage:"stage-6",
    //  founder: [{ownerPercent:33.33, investedPercent:33.33}],
    //  InvestorA: [{ownerPercent:6.67, investedPercent:6.67}],
    //  InvestorB: [{ownerPercent:10, investedPercent:10}],
    //  InvestorB: [{ownerPercent:50, investedPercent:50}],
    // }
]


/////////////////////////////////////////////////////////////////////////////////////////////////
const newStageOne = (_stage) =>{
    const newExit = "60000000"

    const {owners} = _stage

    const displayData = []
    for(let owner of owners){
        const {investor, ownerPercent, investedPercent} = owner

        const convertedNum = new Intl.NumberFormat('de-DE', {maximumSignificantDigits: 1}).format(newExit).split('.')
    
        const fracdArray = newExit / convertedNum[0] 
        const result = currency((convertedNum[0] * (ownerPercent/100) * fracdArray),  { symbol: '€', decimal: ',', separator: '.' }).format()
        displayData.push({investor, ownerPercent, investedPercent, result})
    }
    //console.log(displayData)
    addResults( displayData, _stage.stage)
    
}


/////////////////////////////////////////////////////////////////////////////////
const newStageTwo = (_stage) =>{

    const newExit = "25000000"
    const gains = newExit - "18000000"

    //console.log(gains)

    const {owners} = _stage

    const displayData = []
    for(let owner of owners){
        let {investor, ownerPercent, investedAmount} = owner

        const convertedNum = new Intl.NumberFormat('de-DE', {maximumSignificantDigits: 2}).format(gains).split('.')
        
        const fracdArray = gains / convertedNum[0] 
        //console.log(fracdArray * investedAmount)

        investedAmount = fracdArray * investedAmount
        const result = currency((convertedNum[0] * (ownerPercent/100) * fracdArray),  { symbol: '€', decimal: ',', separator: '.' }).add(investedAmount).format()
        displayData.push({investor, ownerPercent, investedAmount, result})
    }
    //console.log(displayData)
    addResults( displayData, _stage.stage)
}

/////////////////////////////////////////////////////////////////////////////////////////// PROBLEM BEGIN

const newStageThree = (_stage) =>{
    const newExit = "35000000"
    const gains = newExit - currency("18000000")

    //console.log(currency(gains).format())

    const {owners} = _stage

    const displayData = []

    const investorA = owners.find(item => item.investor == "InvestorA")

    const {investor, ownerPercent} = investorA
    let {result, investedAmount} = convertStuff(investorA, gains, newExit)
    const returnCap = currency(investedAmount*2, { symbol: '€', decimal: ',', separator: '.' })
    

    let convertedNum
    if(result > returnCap){
        const distrAmount = result.subtract(returnCap)
        convertedNum = new Intl.NumberFormat('de-DE', {maximumSignificantDigits: 2}).format(distrAmount).split('.')
        //console.log(convertedNum)
        result = returnCap.format()
    }
    for(let owner of owners){
        let {investor, ownerPercent, investedAmount} = owner
        if(owner != investorA) {
            //console.log(owner)
            let {result} = convertStuff(owner, gains, newExit)

            result = result.add(currency(convertedNum[0] * (ownerPercent/100))).format()
            displayData.push({investor, ownerPercent, investedAmount, result})
        }
        
        // let {investor, ownerPercent, investedAmount} = owner

        // const convertedNum = new Intl.NumberFormat('de-DE', {maximumSignificantDigits: 2}).format(gains).split('.')
        
        // const fracdArray = gains / convertedNum[0] 
        // console.log(fracdArray * investedAmount)

        // investedAmount = fracdArray * investedAmount
        // const result = currency((convertedNum[0] * (ownerPercent/100) * fracdArray),  { symbol: '€', decimal: ',', separator: '.' }).add(investedAmount).format()
        // const resultUnF = currency((convertedNum[0] * (ownerPercent/100) * fracdArray),  { symbol: '€', decimal: ',', separator: '.' }).add(investedAmount)


        //if(investor == "InvestorA" && resultUnF > currency(investedAmount*2)){
            
            //console.log(resultUnF - currency(investedAmount*2))
            //const result = currency((convertedNum[0] * (ownerPercent/100) * fracdArray),  { symbol: '€', decimal: ',', separator: '.' }).add(investedAmount).format()
        //}
        
    }
    displayData.push({investor, ownerPercent, investedAmount, result})
    //console.log(displayData)
    addResults( displayData, _stage.stage)
    
}
////////////////////////////////////////////////////////////////////////////////////////// PROBLEM END
/////////////////////////////////////////////////////////////////////////////////////////// PROBLEM BEGIN
const newStageFour = (_stage) =>{

    const newExit = "45000000"
    let gains = newExit - "19200000"

   // FUNCTIONALITY TO CALCULATE RETURNS BASED ON CAP
   const {owners} = _stage
   

    const convertedCommonsResults = findCommons(owners, gains)
    const capedInvestorsResults = findCap(owners)
    const liqPrefrenceResults = findLiqPref(owners, gains)

    const combined = [...capedInvestorsResults,...liqPrefrenceResults, ...convertedCommonsResults]
    //console.log(capedInvestorsResults)
    //console.log(liqPrefrenceResults)

    combined.sort((a,b) => sortHelper(a.seniority,b.seniority))
    console.log(combined)

    // let addedStuff= 0;
    // for(let item of combined){
    //     addedStuff = addedStuff + item.result
    //     console.log(addedStuff)
    // }
    //console.log(currency(newExit - addedStuff,{ symbol: '€', decimal: ',', separator: '.' }).format())
    // FUNCTIONALITY TO CALCULATE PREFERED LIQUDATION 

}
const sortHelper = (a,b)=>a>b?1:a<b?-1:0;

const EURO = value => currency(value, { symbol: '€', decimal: ',', separator: '.' }).format();
const findCommons = (_owners, _gains) =>{

    const liqUn = _owners.filter(owner => owner.liqPref == "common")
    //console.log(liqUn)

    const investorPrefsRes = []
    for(let owner of liqUn){
        //console.log(currency(_gains))
        let {seniority, ownerPercent, investedAmount, investor} = owner

        const result = EURO(((ownerPercent/100)* _gains))

        //console.log(currency(ownerReturn, { symbol: '€', decimal: ',', separator: '.' }).format())

        investorPrefsRes.push({seniority, investor, result})

    }
    return investorPrefsRes
}

const findCap = (_owners) => {
    const capOwners =_owners.filter(owner => owner.cap > 0)
   

    const capedInvestorsResults = []
    for(let capOwner of capOwners){
        const {seniority, investor, investedAmount} = capOwner
        //console.log(capOwner.cap)
        const result = EURO((investedAmount * 2) * 1000000)
        //gains = gains - result;
        console.log(result)
        capedInvestorsResults.push({seniority, investor, result})
    }
    return capedInvestorsResults
}

const findLiqPref = (_owners, _gains) =>{
    const liqUn = _owners.filter(owner => owner.liqPref == "participation-uncap")
    //console.log(liqUn)

    const investorPrefsRes = []
    for(let owner of liqUn){
        //console.log(currency(_gains))
        let {seniority, ownerPercent, investedAmount, investor} = owner

        const result =EURO(((ownerPercent/100)* _gains) + (investedAmount * 1000000))

        //console.log(currency(ownerReturn, { symbol: '€', decimal: ',', separator: '.' }).format())

        investorPrefsRes.push({seniority, investor, result})

    }
    return investorPrefsRes
}

/////////////////////////////////////////////////////////////////////////////////////////// PROBLEM BEGIN
const convertStuff = (_owner, _gains, newExit) => {
    let {ownerPercent, investedAmount} = _owner

    const convertedNum = new Intl.NumberFormat('de-DE', {maximumSignificantDigits: 2}).format(_gains).split('.')
    
    const fracdArray = _gains / convertedNum[0] 
    //console.log(fracdArray * investedAmount)

    investedAmount = fracdArray * investedAmount
    //const result = currency((convertedNum[0] * (ownerPercent/100) * fracdArray),  { symbol: '€', decimal: ',', separator: '.' }).add(investedAmount).format()
    const result = currency((convertedNum[0] * (ownerPercent/100) * fracdArray),  { symbol: '€', decimal: ',', separator: '.' }).add(investedAmount)
    return {result, investedAmount}
}
/////////////////////////////////////////////////////////////////////////////////////////

const addResults = (_data, stage) =>{
   //console.log(stage)
   const resultContainer = document.createElement("div");
    resultContainer.className = `${stage} container`
    tableContainer.append(resultContainer)
    for(let item of _data){
        let {investor, ownerPercent, investedPercent, result} = item;
        const dataCol = document.createElement("li")
        resultContainer.append(dataCol);
        dataCol.innerHTML = `${investor}: ${result}`
    }
}
for(let stage of allStages){
    const newStage = stage.stage
    
    if(newStage == "stage-1"){
       newStageOne(stage)
    }
    if(newStage == "stage-2"){
       newStageTwo(stage)
    }
    if(newStage == "stage-3"){
        newStageThree(stage)
     }
     if(newStage == "stage-4"){
        newStageFour(stage)
     }


    
    
    console.log()
        //console.log(investorClass, value)
        // problem
    


}















const stages = ["stage-1", "stage-2", "stage-3", "stage-4", "stage-5", "stage-6"]

// for(let stage of stages){

// const resultContainer = document.createElement("div");
// resultContainer.className = `${stage}`
// tableContainer.append(resultContainer)

// }




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
    //console.log(reformatedAmount)

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

    const investedAmount = 18000000;

    const gain = _exitAmount - investedAmount
   //console.log("gain total: ", gain)


   
    const stageOneData = []
    for(let data of investData){
        const dataCol = document.createElement("li")
        let {investorClass, value} = data;
        let gainPerInvestor;
        let investmentPerInvestor;

        if(investorClass == "Founders"){
             gainPerInvestor = formatTodecimal( gain * (value/100))
             investmentPerInvestor = 0
        }
         gainPerInvestor = formatTodecimal( gain * (value/100))
         investmentPerInvestor = investedAmount * (value / 100)
        //console.log("total gain per investor: ", gainPerInvestor + investmentPerInvestor)

        //console.log("gain per investor: ",gainPerInvestor)
        //console.log("investment per investor: ",investmentPerInvestor)
        //console.log(" ")
        //value = formatTodecimal( Math.round(_exitAmount * (value / 100)))
        //console.log(investorClass, value)
        // problem
        //stageOneContainer.append(dataCol);
        //dataCol.innerHTML = `${investorClass}: €${value}`

    }
}

 * 
 
/////////////////////////////////////////////////////////////////////////////////////////// PROBLEM BEGIN
 */