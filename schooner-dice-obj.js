
class SchoonerDice {
    static SIDES_ON_DICE = 8;
    static NUM_DICE = 5;
    static categories = [
        {
            name: 'Aces',
            qualifies: (rolls) => {
                return true;
            },
            score: (rolls) => {
                return rolls.reduce((total, roll) => total + (roll == 1 ? roll : 0))
            }
        },
        {
            name: 'Twos',
            qualifies: (rolls) => {
                return true;
            },
            score: (rolls) => {
                return rolls.reduce((total, roll) => total + (roll == 2 ? roll : 0))
            }
        },
        {
            name: 'Threes',
            qualifies: (rolls) => {
                return true;
            },
            score: (rolls) => {
                return rolls.reduce((total, roll) => total + (roll == 3 ? roll : 0))
            }
        },
        {
            name: 'Fours',
            qualifies: (rolls) => {
                return true;
            },
            score: (rolls) => {
                return rolls.reduce((total, roll) => total + (roll == 4 ? roll : 0))
            }
        },
        {
            name: 'Fives',
            qualifies: (rolls) => {
                return true;
            },
            score: (rolls) => {
                return rolls.reduce((total, roll) => total + (roll == 5 ? roll : 0))
            }
        },
        {
            name: 'Sixes',
            qualifies: (rolls) => {
                return true;
            },
            score: (rolls) => {
                return rolls.reduce((total, roll) => total + (roll == 6 ? roll : 0))
            }
        },
        {
            name: 'Sevens',
            qualifies: (rolls) => {
                return true;
            },
            score: (rolls) => {
                return rolls.reduce((total, roll) => total + (roll == 7 ? roll : 0))
            }
        },
        {
            name: 'Eights',
            qualifies: (rolls) => {
                return true;
            },
            score: (rolls) => {
                return rolls.reduce((total, roll) => total + (roll == 8 ? roll : 0))
            }
        },
        {
            name: 'Three of a kind',
            qualifies: (rolls) => {
                return false;
            },
            score: (rolls) => {
                return 0;
            }
        },
        {
            name: 'Four of a kind',
            qualifies: (rolls) => {
                return false;
            },
            score: (rolls) => {
                return 0;
            }
        },
        {
            name: 'Full house',
            qualifies: (rolls) => {
                return false;
            },
            score: (rolls) => {
                return 0;
            }
        },
        {
            name: 'Small straight',
            qualifies: (rolls) => {
                return false;
            },
            score: (rolls) => {
                return 0;
            }
        },
        {
            name: 'Large straight',
            qualifies: (rolls) => {
                return false;
            },
            score: (rolls) => {
                return 0;
            }
        },
        {
            name: 'All different',
            qualifies: (rolls) => {
                return false;
            },
            score: (rolls) => {
                return 0;
            }
        },
        {
            name: 'Schooner',
            qualifies: (rolls) => {
                return false;
            },
            score: (rolls) => {
                return 0;
            }
        },
        {
            name: 'Chance',
            qualifies: (rolls) => {
                return false;
            },
            score: (rolls) => {
                return 0;
            }
        },

    ];

    static rollDice(userInput) {
        let rolls = [];
        if (userInput) {
            try {
                rolls = userInput.split(',').map(num => parseInt(num)).forEach(num => {
                    if (num < 1 || num > SchoonerDice.numDice) {
                        throw (`${num} out of bounds`)
                    }
                })
            } catch (err) {
                console.log(`unable to get 5 rolls between 1 and 8 from ${userInput}, generating roll randomly`)
                alert(`unable to get 5 valid rolls from ${userInput}`)
            }
        }
        if (rolls.length != numDice) {
            for (let i = 0; i < NUM_DICE; i++) {
                rolls.push(Math.floor(Math.random() * SIDES_ON_DICE))
            }
        }

        console.log(`Rolls: ${JSON.stringify(rolls)}`)
    }

    static getCategoryNames() {
        return this.categories.maps(c => c.name);
    }
    static qualifies(roll, category) {
        return (categories[category].qualifies(roll))
    }


}