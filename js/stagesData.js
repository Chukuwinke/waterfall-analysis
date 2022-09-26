export const allStages = [
    {stage:"stage-1",
        owners:[
            {seniority:1, investor:"Founders", ownerPercent:33.33, investedPercent:33.33, liqPref:"common", cap:0},
            {seniority:2, investor:"InvestorA", ownerPercent:6.67, investedPercent:6.67, liqPref:"common", cap:0},
            {seniority:3, investor: "InvestorB", ownerPercent:10, investedPercent:10, liqPref:"common", cap:0},
            {seniority:4, investor: "InvestorC", ownerPercent:50, investedPercent:50, liqPref:"common", cap:0},
        ]
    },
    {stage:"stage-2",
        owners:[
            {seniority:1, investor:"Founders", ownerPercent:33.33, investedAmount:0, liqPref:"participation-uncap", cap:0},
            {seniority:2, investor:"InvestorA", ownerPercent:6.67, investedAmount:0.9, liqPref:"participation-uncap", cap:0},
            {seniority:3, investor: "InvestorB", ownerPercent:10, investedAmount:2.1, liqPref:"participation-uncap", cap:0},
            {seniority:4, investor: "InvestorC", ownerPercent:50, investedAmount:15, liqPref:"participation-uncap", cap:0},
            ]
    },
    {stage:"stage-3",
        owners:[
            {seniority:1, investor:"Founders", ownerPercent:37.71, investedAmount:0, liqPref:"participation-uncap", cap:0},
            {seniority:2, investor:"InvestorA", ownerPercent:6.67, investedAmount:0.9, liqPref:"participation-cap", cap:2},
            {seniority:3, investor: "InvestorB", ownerPercent:10.71, investedAmount:2.1, liqPref:"participation-uncap", cap:0},
            {seniority:4, investor: "InvestorC", ownerPercent:53.57, investedAmount:15, liqPref:"participation-uncap", cap:0},
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