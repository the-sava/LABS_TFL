import { readFileSync } from 'fs'

type parsedRule = { leftSide: string; rightSide: string }
type parsedTerm = { leftSide: Tree; rightSide: Tree }

class Term {
	public name: string
	public left: Term
	public right: Term
	public parent: any

	constructor(name, parent = null) {
		this.name = name
		this.left = null
		this.right = null
		this.parent = parent
	}
}

class Tree {
	public root: Term
	public currentTerm: Term
	constructor(root) {
		this.root = root
		this.currentTerm = root
	}

	push(name) {
		if (!this.currentTerm.left) {
			this.currentTerm.left = new Term(name, this.currentTerm)
		} else if (!this.currentTerm.right) {
			this.currentTerm.right = new Term(name, this.currentTerm)
		} else {
			throw new Error(
				`Ошибка в терме: ${this.currentTerm.name}: в терме не может быть более 2-х аргументов`
			)
		}
	}

	build(str: string) {}

	down() {
		if (this.currentTerm.left) this.currentTerm = this.currentTerm.left
	}

	up() {
		this.currentTerm = this.currentTerm.parent
	}
	next() {
		this.currentTerm = this.currentTerm.right
	}

	toString() {
		// let result: string = ""
		// let t: Term = this.root
		// while (t !== null) {
		// 	result.push()
		// }	 
	}
}
class TRS {
	private _filename: string
	private _lines: string[]
	private _variables: string[]
	private _rules: string[]
	private _parsedRules: parsedRule[]
	private parsedTerms: parsedTerm[]

	constructor(filename: string) {
		this._filename = filename
		this._lines = []
		this._variables = []
		this._rules = []
		this._parsedRules = []
		this.parsedTerms = []
		this.parseFile()
		this.parseVariables()
		this.parseRules()
		this.parseTerms()
	}

	private parseFile() {
		let fileContent: string = readFileSync(this._filename, 'utf-8')
		this._lines = fileContent.split('\n').map(line => {
			let newLine: string = ''
			for (let c of line) {
				if (c! != ' ') newLine += c
			}
			return newLine.trim()
		})
	}

	private parseVariables() {
		this._variables = this._lines[0].split('=')[1].trim().split(',')
	}

	private parseRules() {
		for (let i = 0; i < this._lines.length; i++) {
			if (i > 0) this._rules.push(this._lines[i])
		}
		for (let rule of this._rules) {
			this._parsedRules.push({
				leftSide: rule.split('=')[0].trim(),
				rightSide: rule.split('=')[1].trim()
			})
		}
	}

	private parseTerms() {
		for (let parsedRule of this._parsedRules) {
			let leftSide = parsedRule.leftSide
			let leftTerm: Term
			let leftTree: Tree
			for (let i = 0; i < leftSide.length; i++) {
				if (leftSide[i] === '(') {
					leftTree.down()
				} else if (leftSide[i] === ')') {
					leftTree.up()
				} else if (leftSide[i] === ',') {
					// leftTree.next()
				} else {
					if (i === 0) {
						leftTerm = new Term(leftSide[i])
						leftTree = new Tree(leftTerm)
					} else {
						leftTree.push(leftSide[i])
					}
				}
			}
			let rightSide = parsedRule.rightSide
			let rightTerm: Term
			let rightTree: Tree
			for (let i = 0; i < rightSide.length; i++) {
				if (rightSide[i] === '(') {
					rightTree.down()
				} else if (rightSide[i] === ')') {
					rightTree.up()
				} else if (rightSide[i] === ',') {
					// leftTree.next()
				} else {
					if (i === 0) {
						rightTerm = new Term(rightSide[i])
						rightTree = new Tree(rightTerm)
					} else {
						rightTree.push(rightSide[i])
					}
				}
			}
			this.parsedTerms.push({ leftSide: leftTree, rightSide: rightTree })
		}
	}

	public print() {
		console.log(`Файл: ${this._filename}`)
		console.log(
			`TRS: \n${this._lines
				.map(line => {
					return line
				})
				.join('\n')}`
		)
		console.log(`Переменные: ${this._variables}`)
		console.log(
			`Правила переписывания: \n${this._rules
				.map(rule => rule)
				.join('\n')}`
		)
		console.log(`Термы отпарсерные: `)
		for (let )
	}
}

export { TRS }
