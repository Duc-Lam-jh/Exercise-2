import Question from './question.js';
import Answer from './answer.js';

//questions
const questionData = {
	whereToGo   : {
		parent   : null,
		data     : 'Where are you going?',
		children : [ 'movies', 'cafe', 'home' ],
	},
	whatToWatch : {
		parent   : 'movies',
		data     : 'What are you watching?',
		children : [ 'harrypotter', 'avengers' ],
	},
	whatToDrink : {
		parent   : 'cafe',
		data     : 'What are you drinking?',
		children : [ 'coffee', 'milktea' ],
	},
	whatMilkTea : {
		parent   : 'milktea',
		data     : 'What kind of milktea?',
		children : [ 'bobaMilktea', 'chocolateMilktea' ],
	},
};

//answers
const answerData = {
	movies           : {
		parent   : 'whereToGo',
		data     : 'To the movies',
		children : 'whatToWatch',
	},
	cafe             : {
		parent   : 'whereToGo',
		data     : 'To the cafe',
		children : 'whatToDrink',
	},
	home             : {
		parent   : 'whereToGo',
		data     : 'Stay home',
		children : null,
		final    : true,
	},

	harrypotter      : {
		parent   : 'whatToWatch',
		data     : 'The new Harry Potter movie.',
		children : null,
		final    : true,
	},
	avengers         : {
		parent   : 'whatToWatch',
		data     : 'Avengers 5!',
		children : null,
		final    : true,
	},
	coffee           : {
		parent   : 'whatToDrink',
		data     : 'Some coffee.',
		children : null,
		final    : true,
	},
	milktea          : {
		parent   : 'whatToDrink',
		data     : 'My favoriter milktea!',
		children : 'whatMilkTea',
	},
	chocolateMilktea : {
		parent   : 'whatMilktea',
		data     : 'Sweet chocolate milktea!',
		children : null,
		final    : true,
	},
	bobaMilktea      : {
		parent   : 'whatMilktea',
		data     : 'With boba so I can chew on them!',
		children : null,
		final    : true,
	},
};

function getQuestion (questionName) {
	const question = new Question(
			questionData[questionName].data,
			questionData[questionName].parent,
			[],
		),
		answers = questionData[questionName].children;

	answers.forEach(a => {
		question.appendChild(getAnswer(a));
	});
	return question;
}

function getAnswer (answerName) {
	const answer = new Answer(
				answerData[answerName].data,
				answerData[answerName].parent,
				answerData[answerName].children,
				answerData[answerName].final,
	);
	return answer;
}

function clickAnswer (e) {
	if (e.final) {
		alert('Have fun!');
		return;
	}
	loadTree(e.children);
}

function goBack (parentName) {
	const answer = getAnswer(parentName);
	loadTree(answer.parent);
}

function loadTree (questionName) {
	const question = getQuestion(questionName);
	document.getElementById('question').innerHTML = question.data;

	//reset the screen
	const list = document.getElementById('answers');
	list.innerHTML = '';
	const button = document.getElementById('button');
	if (button != null) {
		button.remove();
	}

	//show the answers
	question.children.forEach(child => {
		//console.log(child);
		const answer = document.createElement('li');
		answer.innerHTML = child.data;
		answer.addEventListener('click', () => clickAnswer(child));
		list.appendChild(answer);
	});

	//show the back button
	if (question.parent != null) {
		const button = document.createElement('button');
		button.setAttribute('id', 'button');
		button.innerHTML = 'Back';
		button.addEventListener('click', function() {goBack(question.parent)});
		// button.addEventListener('click', goBack(question.parent));
		const container = document.getElementById('container');
		container.appendChild(button);
	}
}

// console.log(questions);
// console.log(getQuestion('whereToGo'));
loadTree('whereToGo');
