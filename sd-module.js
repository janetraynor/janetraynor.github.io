const score = (categoryName, rolls) => {
    const chosenCategory = categories.find(category => category.name == categoryName)
    return chosenCategory.score(getCounts(rolls));
}

const topCategories = (rolls) => {
    const counts = getCounts(rolls);
    const scores = categories.map(category => {
        const score = category.score(counts);
        return {
            name: category.name,
            points: score
        }
    });
    const highestScore = scores.reduce((highestSoFar, score) => {
        if (score.points > highestSoFar) {
            return score.points;
        }
        else {
            return highestSoFar;
        }
    }, 0);
    return scores.filter(score => score.points == highestScore)
}

const categories = [
    {
        name: 'ONES',
        score: (counts) => {
            return totalDice(counts, 1);
        }
    },
    {
        name: 'TWOS',
        score: (counts) => {
            return totalDice(counts, 2);
        }
    },
    {
        name: 'THREES',
        score: (counts) => {
            return totalDice(counts, 3);
        }
    },
    {
        name: 'FOURS',
        score: (counts) => {
            return totalDice(counts, 4);
        }
    },
    {
        name: 'FIVES',
        score: (counts) => {
            return totalDice(counts, 5);
        }
    },
    {
        name: 'SIXES',
        score: (counts) => {
            return totalDice(counts, 6);
        }
    },
    {
        name: 'SEVENS',
        score: (counts) => {
            return totalDice(counts, 7);
        }
    },
    {
        name: 'EIGHTS',
        score: (counts) => {
            return totalDice(counts, 8);
        }
    },
    {
        name: 'THREE_OF_A_KIND',
        score: (counts) => {
            if (hasMatches(counts, 3)) {
                return totalDice(counts);
            }
            else {
                return 0;
            }
        }
    },
    {
        name: 'FOUR_OF_A_KIND',
        score: (counts) => {
            if (hasMatches(counts, 4)) {
                return totalDice(counts);
            }
            else {
                return 0;
            }
        }
    },
    {
        name: 'FULL_HOUSE',
        score: (counts) => {
            let qualifies = false;
            const foundThree = counts.findIndex(count => count >= 3)
            if (foundThree > 0) {
                const foundTwo = counts.find((count, index) => count >= 2 && index != foundThree)
                if (foundTwo) {
                    qualifies = true;
                }
            }
            if (qualifies) {
                return 25;
            }
            else {
                return 0;
            }
        }
    },
    {
        name: 'SMALL_STRAIGHT',
        score: (counts) => {
            if (hasStraight(counts, 4)) {
                return 30;
            }
            else {
                return 0;
            }
        }
    },
    {
        name: 'LARGE_STRAIGHT',
        score: (counts) => {
            if (hasStraight(counts, 5)) {
                return 40;
            }
            else {
                return 0;
            }
        }
    },
    {
        name: 'ALL_DIFFERENT',
        score: (counts) => {
            const allDifferent = counts.reduce((allDiff, count) => {
                return allDiff && count <= 1;
            }, true);
            if (allDifferent) {
                return 35;
            }
            else {
                return 0;
            }
        }
    },
    {
        name: 'SCHOONER',
        score: (counts) => {
            if (hasMatches(counts, NUM_DICE)) {
                return 50;
            }
            else {
                return 0;
            }
        }
    },
    {
        name: 'CHANCE',
        score: (counts) => {
            return totalDice(counts);
        }
    },
];

const getCounts = (rolls) => {
    const counts = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    rolls.forEach(roll => {
        counts[roll]++;
    })
    return counts;
}

const totalDice = (counts, forWhich) => {
    if (forWhich) {
        return forWhich * counts[forWhich]
    }
    else {
        return counts.reduce((total, count, index) => {
            return total + (count * index);
        }, 0);
    }
}

const hasMatches = (counts, numMatches) => {
    return counts.reduce((found, count) => {
        return found || count >= numMatches;
    }, false);
}

const hasStraight = (counts, straightSize) => {
    const getSmallest = (counts, smallestSoFar) => {
        return counts.findIndex((count, index) => {
            return count > 0 && index > smallestSoFar;
        })
    }
    let qualified = false;
    let smallestRoll = getSmallest(counts, 0);

    while (!qualified && smallestRoll != -1 && smallestRoll <= (SIDES_ON_DICE - straightSize + 1)) {
        qualified = true;
        for (let i = 1; i < straightSize && qualified; i++) {
            if (counts[smallestRoll + i] == 0) {
                qualified = false;
            }
        }
        smallestRoll = getSmallest(counts, smallestRoll)
    }
    return qualified;
}