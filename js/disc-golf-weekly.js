const DG = {
    data() {
        return {
            peoplePerTeam : 1,
            peoplePerTeamOptions : [
                { text : '1', value : 1 },
                { text : '2 (Doubles)', value : 2 },
                // { label : '1', value : 1 },
            ],

            highLowOrRandom : 'random',
            highLowOrRandomOptions : [
                { text : 'Random', value : 'random' },
                { text : 'High / Low', value : 'highLow' },
                // { label : '1', value : 1 },
            ],

            minimumPerCard : 2,
            minimumPerCardOptions : [
                { text : '2', value : 2 },
                { text : '3', value : 3 },
                { text : '4', value : 4 },
                { text : 'All on One Card', value : 'all' },
                // { label : '1', value : 1 },
            ],

            maximumPerCard : 2,
            maximumPerCardOptions : [
                { text : '2', value : 2 },
                { text : '3', value : 3 },
                { text : '4', value : 4 },
                { text : '5', value : 5 },
                { text : '6', value : 6 },
                { text : 'All on One Card', value : 'all' },
                // { label : '1', value : 1 },
            ]
        }
    },

    methods() {



    }
}

Vue.createApp( DG ).mount('#DG')