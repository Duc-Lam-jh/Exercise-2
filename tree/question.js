export default class Question {
	constructor (data, parent, children) {
		this.data = data;
		this.parent = parent;
		this.children = children;
	}

	appendChild = input => this.children.push(input);
}
