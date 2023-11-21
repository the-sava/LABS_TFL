"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Automat = void 0;
class Automat {
    constructor(name, numOfStates, alphabet, transitions, startState, finishStates) {
        this._name = name;
        this._alphabet = alphabet;
        this._numOfStates = numOfStates;
        this._startState = startState;
        this._transitions = transitions;
        this._finishStates = finishStates;
        this._adj = [];
        for (let i = 0; i < numOfStates; i++) {
            this._adj.push([]);
            for (let j = 0; j < numOfStates; j++) {
                this._adj[i].push('0');
            }
        }
        for (let transition of this._transitions) {
            this._adj[transition[0]][transition[1]] = transition[2];
        }
    }
    getType() {
        return this._type;
    }
    print() {
        console.log(`Автомат: ${this._name}`);
        console.log(`Количество состояний: ${this._numOfStates}`);
        console.log(`Алфавит: ${this._alphabet}`);
        console.log(`Множество переходов:\n${this._transitions
            .map(transition => transition[0] +
            '=>' +
            transition[2] +
            '=>' +
            transition[1])
            .join('\n')}`);
        console.log(`Начальное состояние: ${this._startState}`);
        console.log(`Множество завершающих состояние: ${this._finishStates}`);
        console.log(`Тип автомата: ${this._type}`);
        console.log('\nСписок смежности:');
        for (let i = 0; i < this._numOfStates; i++) {
            let result = `${i}: [`;
            for (let j = 0; j < this._numOfStates; j++)
                result += `${this._adj[i][j]} `;
            result += ']';
            console.log(result);
        }
        console.log(`\nGraphiz:\n${this.printPdf()}`);
    }
    printPdf() {
        let pdfResult = 'digraph {\nrankdir=LR;\n';
        for (let i = 0; i < this._numOfStates; i++) {
            let currentState = `q${i}`;
            if (this._finishStates.indexOf(currentState) != -1)
                pdfResult += `q${i} [shape=doublecircle]\n`;
            else
                pdfResult += `q${i}\n`;
        }
        for (let i = 0; i < this._adj.length; i++) {
            for (let j = 0; j < this._adj[i].length; j++) {
                if (this._adj[i][j] !== '0')
                    pdfResult += `q${i} -> q${j} [label=${this._adj[i][j]}]\n`;
            }
        }
        pdfResult += '}';
        return pdfResult;
    }
    defineType() {
        this.type = 'DFA';
        for (let i = 0; i < this._adj.length; i++) {
            for (let j = 0; j < this._adj[i].length; j++) {
                if (this._adj[i][j].length !== 1 || this._adj[i][j] === 'e') {
                    this.type = 'NFA';
                    return;
                }
            }
        }
    }
}
exports.Automat = Automat;
//# sourceMappingURL=Automat.js.map