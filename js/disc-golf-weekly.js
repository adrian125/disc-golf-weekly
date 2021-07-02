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
            ],

            persons : [
                {
                    name : '',
                    isTD : true,
                    highLowOptions : [
                        {
                            text : 'No Division',
                            value : 'none'
                        },
                        {
                            text : 'High',
                            value : 'high'
                        },
                        {
                            text : 'Middle',
                            value : 'middle'
                        },
                        {
                            text : 'Low',
                            value : 'low'
                        },
                    ],
                    highLowSelect : 'none'
                }
            ],

            assignmentError : ''
        }
    },

    computed : {
        disableDivision : function() {
            return this.highLowOrRandom === 'random' || this.peoplePerTeam === 1;
        }
    },

    methods : {

        minMaxChange : function() {
            if( this.minimumPerCard > this.maximumPerCard ) {
                alert( 'Minimum per card cannot be higher than the maximum per card. Fix please!' );
            }

            if( ( this.minimumPerCard === 'all' && this.maximumPerCard !== 'all' ) || ( this.minimumPerCard !== 'all' && this.maximumPerCard === 'all' ) ) {
                alert( 'You changed one max min per card setting to "All on One Card". Make sure to change the other!' );
            }
        },

        addPlayer : function() {
            const allFilled = this.persons.reduce( ( acc, cur ) => {
                if( acc === false ) return false;

                acc = cur.name !== '';

                return acc;
            }, true );

            if( !allFilled ) {
                alert( 'Must fill in all previous names before adding another' );
                return;
            }

            this.persons.push( {
                name : '',
                isTD : false,
                highLowOptions : [
                    {
                        text : 'High',
                        value : 'high'
                    },
                    {
                        text : 'Middle',
                        value : 'middle'
                    },
                    {
                        text : 'Low',
                        value : 'low'
                    },
                ],
                highLowSelect : 'low'
            } );

            Vue.nextTick()
                .then( () => {
                    const players = document.getElementsByClassName( 'playerNames' );
                    players[players.length - 1].focus();
                } );

        },

        removePlayer : function( playerIndex ) {

            if( this.persons.length === 1 ) {
                alert( 'Cannot bring total players to zero!' );
                return;
            }

            this.persons.splice( playerIndex, 1 );

        },

        assignCards : function( playersOrTeams ) {

        },

        getHighLowTeams : function( players ) {

            const divisionObject = players.reduce( ( acc, cur ) => {

                acc[cur.highLowSelect].push( cur );
                return acc;

            }, {
                low : [],
                middle : [],
                high : []
            } );



        },

        getRandomTeams : function( players ) {

        },

        assignTeams : function( players ) { // players is an array of objects

            let teams;
            if( this.highLowOrRandom === 'highLow' ) {
                teams = this.getHighLowTeams( players );
            }

            return teams;

        },

        assignPlayers : function() {

            const usefulPlayers = this.persons.filter( el => el.name !== '' );

            if( usefulPlayers.length === 0 ) {
                alert( 'Add at least one player!' );
                return;
            }

            if( this.peoplePerTeam === 1 ) {
                this.assignCards( usefulPlayers );
            }

            if( this.peoplePerTeam === 2 && this.highLowOrRandom === 'highLow' ) {
                const allDivisionsAssigned = usefulPlayers.reduce( ( acc, cur ) => {

                    if( acc === false ) return acc;

                    acc = cur.name !== '';

                    return acc;

                }, true );

                if( !allDivisionsAssigned ) {
                    alert( 'Not every player has been assigned a division!' );
                    return;
                }
            }

            this.assignTeams( usefulPlayers );

        }

    }
}

Vue.createApp( DG ).mount('#DG')
