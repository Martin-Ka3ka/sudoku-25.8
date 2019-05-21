import React from 'react';
import uuid from 'uuid';
import { hot } from 'react-hot-loader'
import style from '../style.css'
import sudoku from 'sudoku-umd'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gameStatus: false,
            board: [],
            initialBoard: []
        };
    }

    setBoard(level) {
        let board = sudoku.generate(level).split('');
        this.setState({ board: board, initialBoard: board })
        this.setState({ gameStatus: true })
    }

    updateField(e, index) {
        let board = [...this.state.board];
        board[index] = e.target.value
        this.setState({ board: board })
    }

    restart() {
        this.setState({ board: this.state.initialBoard })
    }

    solve() {
        this.setState({ board: sudoku.solve(this.state.initialBoard.join('')).split('') })
    }

    check() {
        let solved = sudoku.solve(this.state.board.join('')).split('')
        if (solved) console.log("Udało się!")
        else console.log("Nie udało się")
    }

    render() {
        return (
            <div>
                <h1>Sudoku</h1>
                <div className={((this.state.gameStatus) ? style.levels : style.show)}>
                    <button onClick={() => { this.setBoard('easy') }}>Easy</button>
                    <button onClick={() => { this.setBoard('medium') }}>Medium</button>
                    <button onClick={() => { this.setBoard('hard') }}>Hard</button>
                </div>

                <div className={style.board}>
                    {this.state.board.map((item, index) => {
                        if (this.state.initialBoard[index] == ".") return <input className={style.input} key={index} type='number' onChange={(e) => { this.updateField(e, index) }} value={item} />
                        else return <input disabled className={style.input} key={index} type='number' value={item} />
                    })}
                </div>

                <button onClick={() => { this.solve() }}>Solve</button>
                <button onClick={() => { this.check() }}>Check</button>
                <button onClick={() => { this.restart() }}>Restart</button>
            </div>
        );
    }
}

export default hot(module)(App);
