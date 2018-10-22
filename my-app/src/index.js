import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
      return (
        <button 
			className= { props.winner ? "winner square" : "square" }
			onClick={ props.onClick }
		>
        	{ props.value }
        </button>
      );
    }
 
  class Board extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			squares: Array(9).fill(null),
			xIsNext: true,
		};
	}

	handleClick(i){
		const squares = this.state.squares.slice();
		let xIsNext = this.state.xIsNext;
		if(calculateWinner(squares) || squares[i]) {
			return;
		}
		squares[i] = xIsNext ?  'X' : 'O';
		xIsNext = !xIsNext;
		this.setState({ squares, xIsNext });

	}

    renderSquare(i, winner) {
		let isWinner = false;
		if (winner && winner.combination.indexOf(i) !== -1) {
			isWinner = true;
		}
    	return (
			<Square 
				value={ this.state.squares[i] }
				onClick={ () => this.handleClick(i) }
				winner={ isWinner }
			/>
		);
	}
  
    render() {
	 	const winner = calculateWinner(this.state.squares);
		let status;
		if(winner) {
			status = `Winner: ${winner.sign}`;
		} else {
			status = `Next player: ${ this.state.xIsNext ? 'X' : 'O'}`;  
		}
		return (
			<div>
			<div className="status">{ status }</div>
			<div className="board-row">
				{ this.renderSquare(0, winner) }
				{ this.renderSquare(1, winner) }
				{ this.renderSquare(2, winner) }
			</div>
			<div className="board-row">
				{ this.renderSquare(3, winner) }
				{ this.renderSquare(4, winner) }
				{ this.renderSquare(5, winner) }
			</div>
			<div className="board-row">
				{ this.renderSquare(6, winner) }
				{ this.renderSquare(7, winner) }
				{ this.renderSquare(8, winner) }
			</div>
			</div>
		);
		}
  }
  
  class Game extends React.Component {
		render() {
		return (
			<div className="game">
			<div className="game-board">
				<Board />
			</div>
			<div className="game-info">
				<div>{/* status */}</div>
				<ol>{/* TODO */}</ol>
			</div>
			</div>
		);
		}
  }
  
  // ========================================
  
  ReactDOM.render(
		<Game />,
		document.getElementById('root')
  );
  
  function calculateWinner(squares) {
		const lines = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];
		for (let i = 0; i < lines.length; i++) {
			const [a, b, c] = lines[i];
			if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
				return {
					sign:squares[a],
				    combination: lines[i]
				}
			}
		}
		return null;
  }