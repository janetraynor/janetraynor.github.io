const NUM_DICE = 5
const SIDES_ON_DICE = 8;
const NUM_TOP_CATEGORIES_TO_SHOW = 3;

const init = () => {
    categories.forEach(category => {
        const opt = document.createElement("option");
        opt.textContent = category.name;
        document.getElementById('category-select').appendChild(opt)
    })
}

const scoreOne = () => {
    clearAll();
    const rolls = getRolls();
    const categorySelect = document.getElementById('category-select');
    const chosenCategory = categorySelect.options[categorySelect.selectedIndex].textContent;
    showScore(score(chosenCategory, rolls));
}

const showTop = () => {
    clearAll();
    const rolls = getRolls();
    showCategories(topCategories(rolls))
}

const showAll = () => {
    clearAll();
    const rolls = getRolls();
    rolls.forEach(roll => buildHtmlDie(roll))
    const counts = getCounts(rolls);
    const scores = categories.map(category => {
        const score = category.score(counts);
        return {
            name: category.name,
            points: score
        }
    });
    scores.forEach(score => showScore(score));
    const categoriesByScore = scores.sort((score1, score2) => {
        return score1.points > score2.points ? -1 : 1;
    })
    showCategories(categoriesByScore, true);
}

const getRolls = () => {
    let rolls = [];
    const userInput = document.getElementById('roll-input').value;
    if (userInput) {
        try {
            rolls = userInput.split(',').map(number => parseInt(number));
            if (rolls.length != NUM_DICE) {
                throw (`found ${rolls.legnth} comma-delimited inputs; expected ${NUM_DICE}`)
            }
            rolls.forEach(i => {
                if (i < 1 || i > SIDES_ON_DICE) {
                    throw (`${num} out of bounds`)
                }
            })
        } catch (err) {
            alert(`${err}: unable to get ${NUM_DICE} between 1 and ${SIDES_ON_DICE} valid rolls from ${userInput}`)
            rolls = [];
        }
    }
    if (rolls.length != NUM_DICE) {
        for (let i = 0; i < NUM_DICE; i++) {
            rolls.push(Math.floor(Math.random() * SIDES_ON_DICE) + 1)
        }
    }
    return rolls;
}

const clearAll = () => {
    ['roll-results', 'qualified', 'points'].forEach(output => {
        document.getElementById(output).innerHTML = '';
    })
}

const buildHtmlDie = (roll) => {
    const newDie = document.getElementById('die-template').cloneNode(true);
    newDie.removeAttribute('id');
    newDie.innerHTML += roll;
    document.getElementById('roll-results').appendChild(newDie)
}

const showCategories = (categoriesToShow, withScores) => {
    categoriesToShow.forEach(category => {
        const newQualified = document.getElementById('qualified-template').cloneNode(true);
        newQualified.removeAttribute('id')
        newQualified.innerHTML += `${category.name}`;
        if (withScores) {
            newQualified.innerHTML += ': ' + category.points;
        }
        newQualified.innerHTML += '<br>'
        document.getElementById('qualified').appendChild(newQualified);
    })
}

const showScore = (score) => {
    const newScore = document.getElementById('points-template').cloneNode(true);
    newScore.removeAttribute('id');
    if (typeof score === 'object') {
        newScore.innerHTML += `${score.points} for ${score.name}<br>`;
    }
    else {
        newScore.innerHTML += `${score}<br>`;
    }
    document.getElementById('points').appendChild(newScore)
}


