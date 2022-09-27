import currency from "currency.js"
import { allStages } from "./stagesData"
const inputBox = document.querySelector(".input__box")
const tableBody = document.querySelector(".table-body")
const tableContainer = document.querySelector(".table__container")
const resultSection = document.createElement("div")
const saveFileBtn = document.getElementById("saveFileBtn")
tableContainer.append(resultSection)

let exitAmount
let Exit;

// SETUP LOGIG

///////////////////////////////////////// STAGES-LOGIC-BEGINS ////////////////////////////////////////////////////////
/**  
 * The functionalities for Stage-1 till Stage-4 
 * I assumed that stage-5 and stage-6 follow the same pattern as Stage-1 till Stage-4
 * so no functions were created for them.
*/
const newStageOne = (_stage) =>{

    const {owners, stage} = _stage
    calculateRes(owners, Exit, stage, Exit);
    
}

const newStageTwo = (_stage) =>{

    const proceeds = Exit - "18000000"

    const {owners, stage} = _stage
    calculateRes(owners, proceeds, stage, Exit);
}


const newStageThree = (_stage) =>{
    //const Exit = "35000000"
    const proceeds = Exit - "18000000"

    //console.log(currency(proceeds).format())

    const {owners, stage} = _stage

    calculateRes(owners, proceeds, stage, Exit);
    
}

const newStageFour = (_stage) =>{

    let totalInvested = "19200000"
    let proceeds = Exit - totalInvested
   
    const {owners, stage} = _stage

    calculateRes(owners, proceeds, stage, Exit);

}
///////////////////////////// STAGES-LOGIC-END //////////////////////////////////////////////////////////////////////


//FUNCTIONALITY FOR FINDING INVESTORS WITH COMMON PREFFRENCE
const findCommons = (_owners, _proceeds) =>{

    const liqUn = _owners.filter(owner => owner.liqPref == "common")

    const investorPrefsRes = []
    for(let owner of liqUn){
        
        let {seniority, ownerPercent, investor} = owner

        const result = ((ownerPercent/100)* _proceeds)

        investorPrefsRes.push({seniority, investor, result})

    }
    return investorPrefsRes
}

// FUNCTIONALITY FOR FINDING CAPED INVESTORS
const findCap = (_owners, _proceeds) => {
    const capOwners =_owners.filter(owner => owner.cap > 0)
   
    const capedInvestorsResults = []
    for(let capOwner of capOwners){
        const {seniority, investor, ownerPercent, investedAmount} = capOwner
        
        let result = ((ownerPercent/100)* _proceeds) + (investedAmount * 1000000)
        const capResult = (investedAmount * 2) * 1000000

        if(result > capResult){
            result = capResult
        }
         result = result
        capedInvestorsResults.push({seniority, investor, result})
    }
    return capedInvestorsResults
}

// FUNCTIONALITY FOR FINDING INVESTORS WITH PARTICIPATING PREFRENCE
const findLiqPref = (_owners, _proceeds) =>{
    const liqUn = _owners.filter(owner => owner.liqPref == "participation-uncap" && owner.cap == 0)
   
    const investorPrefsRes = []
    for(let owner of liqUn){
        let {seniority, ownerPercent, investedAmount, investor} = owner
        
        const result =((ownerPercent/100)* _proceeds) + (investedAmount * 1000000)

        investorPrefsRes.push({seniority, investor, result})

    }
    return investorPrefsRes
}

// FUNCTION TO ADD RESULTS TO THE SCREEN
const addResults = (_data, stage, _Exit) =>{

    // CREATING THE RESULT CARD AND APPENDING IT TO THE DOM
    const resultContainer = document.createElement("div");
    const cardHeader = document.createElement("h4");
    // CREATING THE DELETE BTN AND APPENDING IT TO THE RESULT CONTAINER CARD
    const deleteBtn = document.createElement("button");
    const id = randomId()
    deleteBtn.id = id
    deleteBtn.className = 'delete-btn'
    deleteBtn.innerHTML = 'delete'
    cardHeader.innerHTML = `${stage} Exit: ${EURO(_Exit)}`
    resultContainer.className = `${stage} container`
    resultSection.append(resultContainer)
    resultContainer.append(deleteBtn)
    resultContainer.append(cardHeader)


    deleteBtn.onclick = () =>{
        resultContainer.remove()
        const x = content.find(item => item.id == id)
        content.splice(content.indexOf(x), 1)

    }
     _Exit = `Exit Amount: ${EURO(_Exit)}`
     
     const investorReturns = []
     for(let item of _data){
         let {investor, result} = item;
         const dataCol = document.createElement("li")
         resultContainer.append(dataCol);
         const investorContent = `${investor}: ${result}`
         dataCol.innerHTML = investorContent
        investorReturns.push(investorContent)
     }
     content.push({id, stage,_Exit, investorReturns})
 }

 // FUNCTION TO CALCULATES THE RETURN FOR EACH INVESTOR
 const calculateRes = (_owners, _proceeds, _stage, _Exit) => {

    let remainder = _Exit

    // SORTS THE INVESTOR BY THEIR LIQUIDATION PREFERENCE AND RETURNS THE RESULTING PROCEEDS 
    const convertedCommonsResults = findCommons(_owners, _proceeds)
    const capedInvestorsResults = findCap(_owners, _proceeds)
    const liqPrefrenceResults = findLiqPref(_owners, _proceeds)

    const combined = [...capedInvestorsResults,...liqPrefrenceResults, ...convertedCommonsResults]

// SORTING BY SENIORITY AND SUBTRACTING INVESTOR RETURN FROM THE PROCCEDS REMAINDER
    combined.sort((a,b) => sortHelper(a.seniority,b.seniority))
    combined.reverse();
    
    for(let i = 0; i < combined.length; i++){
        
        if(i == combined.length-1 && remainder > 0){
            combined[i].result = remainder
        }
        else if((remainder - combined[i].result) <= 0 ){
            console.log(combined[i])
            console.log(remainder)
            combined[i].result = remainder
        }
        else if(remainder < combined[i].result && !remainder < 0){
            combined[i].result = remainder
        }
        
        
        remainder = remainder - combined[i].result
        combined[i].result = EURO(combined[i].result)
       
    }

    //REVERSING THE COMBINED DATA ARRAY AND DISPLAYING IT TO THE SCREEN
    combined.reverse();
    addResults(combined, _stage, _Exit)

 }

 // LOGIC TO SAVE RESULT TO TXT FILE FORMAT
 const saveFile = (_content) =>{
   

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
    createStageBtn.innerHTML = `Generate ${newStage} Data`
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
    
    saveFileBtn.onclick = () => saveFile(content)

}


// EXIT-AMOUNT-INPUT EVENT HANDLERS  
inputBox.onchange = (e) =>{
    Exit = e.target.value
}

inputBox.onblur = (e) =>{
    exitAmount = e.target.value
    const formated = formatTodecimal(exitAmount)
    inputBox.value = formated
}

inputBox.onfocus = (e) => {
    exitAmount = e.target.value
    const reformated = formatToInt(exitAmount)

    inputBox.value = reformated
}

// FORMAT INPUT FUNCTIONALITIES
function formatTodecimal (_exitAmount){
    
    let formatedAmount = new Intl.NumberFormat('de-DE', {
        maximumSignificantDigits: 2
      }).format(_exitAmount)
    return formatedAmount
}
function formatToInt (_exitAmount){
    const reformatedAmount = _exitAmount.replaceAll('.','')

    return reformatedAmount
}