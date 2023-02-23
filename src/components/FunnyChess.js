import { Box, Button } from '@mui/material';
import { setSelectionRange } from '@testing-library/user-event/dist/utils';
import {useState} from 'react'
import api from '../Requests'

export default function FunnyChess(props) {
    const pixelHeight = 12;
    const pixelWidth = 12;
    const width = 1/pixelWidth;
    const height = 1/pixelHeight;
    const moves = {
        pawn: [[1,0],[-1,0],[0,-1],[0,1]],
        knight: [[2,2],[1,1],[-2,-2],[-1,-1],[-2,2],[-1,1],[2,-2],[1,-1]],
        king: [],
        queen: [],
        rook: [[2, 2], [1,1], [0,2], [-1, 1], [-2, 2], [2, 0], [-2, 0], [2, -2], [1, -1], [0, -2], [-1, -1], [-2, -2]],
        bishop: [[0, 1], [0, 2], [0, -1], [0, -2], [1, 0], [-1, 0]]

    }
    const startMenu = (
        <div style={{zIndex: 1, position: 'reletive', top: '0px', left: '0px'}}>
            <span>There is currently no game in progress.</span>
            <Button onClick={() => startGame()}>Start Game?</Button>
        </div>
    )
    let tempBoard = [...Array(pixelWidth)].map(_=>Array(pixelHeight).fill(''));
    const set = {0: {king: '♔', queen: '♕', knight: '♘', bishop: '♗', rook: '♖', pawn: '♙'}, [pixelHeight-1]: {king: '♚', queen: '♛', knight: '♞', bishop: '♝', rook: '♜', pawn: '♟'}}
    for(let i = 0; i < pixelWidth; i++)
        tempBoard[i][1] = set[0].pawn // pawns
    for(let i = 0; i < pixelWidth; i++)
        tempBoard[i][pixelHeight-2] = set[pixelHeight-1].pawn // pawns
    let center = Math.ceil(pixelWidth/2);
    for(let j=0; j<=pixelHeight; j+=pixelHeight-1){
        tempBoard[center][j] = set[j].king; // king
        tempBoard[center+1][j] = set[j].queen
        tempBoard[center-1][j] = set[j].queen
        tempBoard[center-2][j] = set[j].knight
        tempBoard[center-4][j] = set[j].knight
        tempBoard[center+2][j] = set[j].knight
        tempBoard[center+4][j] = set[j].knight
        tempBoard[center+3][j] = set[j].bishop
        tempBoard[center-3][j] = set[j].bishop
        if(j==0)tempBoard[center-3][Math.ceil(pixelHeight/2)] = set[j].rook; else tempBoard[center+3][Math.ceil(pixelHeight/2)] = set[j].rook; 
    }
    const [board, updateBoard] = useState(tempBoard);
    const [selectedBoard, updateSelected] = useState([[...Array(pixelWidth)].map(_=>Array(pixelHeight).fill(false)), [0,0], false]) // selected array, whether in selection phase, original piece location
    const [gameState, updateGameState] = useState({state: 'notstarted', menu: startMenu, winner: false}) // GAMESTATE, MENU, WINNER

    let selectPiece = (i, j) => {
        let newSelectedBoard = [...Array(pixelWidth)].map(_=>Array(pixelHeight).fill(false))
        switch(board[i][j]){
            case set[0].pawn: // pawn can only move 1 space in cardinal direction (NSEW)
            case set[pixelHeight-1].pawn:
                for(let move of moves.pawn){
                    if(i+move[0] >= 0 && i+move[0] < pixelWidth && j+move[1] >= 0 && j+move[1] < pixelHeight)
                        newSelectedBoard[i+move[0]][j+move[1]] = true;
                }
                break;
            case set[0].knight: // knights can move 2 spaces diagonal
            case set[pixelHeight-1].knight:
                for(let move of moves.knight){
                    if(i+move[0] >= 0 && i+move[0] < pixelWidth && j+move[1] >= 0 && j+move[1] < pixelHeight)
                        newSelectedBoard[i+move[0]][j+move[1]] = true;
                }
                break;
            case set[0].king:
            case set[pixelHeight-1].king: // king cant move
                break;
            case set[pixelHeight-1].queen:
            case set[0].queen: // queen can move anywhere on the newSelectedBoard (She doesnt capture she just teleports and can block others)
                newSelectedBoard = [...Array(pixelWidth)].map(_=>Array(pixelHeight).fill(true));
                break;
            case set[0].rook:
            case set[pixelHeight-1].rook: // rook can in like a checkered square
            /*
                X-O-X-O-X
                O-X-O-X-O
                X-O-R-O-X
                O-X-O-X-O
                X-O-X-O-X
                Rook can move to any X's
            */ 
                for(let move of moves.rook){
                    if(i+move[0] >= 0 && i+move[0] < pixelWidth && j+move[1] >= 0 && j+move[1] < pixelHeight)
                        newSelectedBoard[i+move[0]][j+move[1]] = true;
                }

                break;
            case set[pixelHeight-1].bishop:
            case set[0].bishop: // Has a spin attack (kills any pieces adjacent to it when moving, moved 2 spaces forward or backwards, or 1 space left or right)
                for(let move of moves.bishop){
                    if(i+move[0] >= 0 && i+move[0] < pixelWidth && j+move[1] >= 0 && j+move[1] < pixelHeight)
                        newSelectedBoard[i+move[0]][j+move[1]] = true;
                }
                break;
        }
        updateSelected([newSelectedBoard, [i,j], selectedBoard[2]]); // set to true to say next click will be actually moving piece
    }

    let movePiece = (from, to) => {
        let newBoard = [...board];
        let check = [...from];
        let piece = board[from[0]][from[1]];
        console.log(`Displacement: [${to[0] - from[0]}, ${to[1] - from[1]}]`)
        if(!['♕', '♛'].includes(piece))
            while(check[0] != to[0] && check[1] != to[0]){
                console.log(check)
                if(Object.values(set[!selectedBoard[2] ? 0 : (pixelHeight-1)]).includes(board[check[0]][check[1]])) newBoard[check[0]][check[1]] = '';
                check[0] = check[0] + ((to[0] - from[0]) > 0 ? 1 : -1);
                check[1] = check[1] + ((to[1] - from[1]) > 0 ? 1 : -1);
            }
        if(['♗', '♝'].includes(piece))
            for(let i = to[0]-1; i <= to[0]+1; i++)
                for(let j = to[1]-1; j <= to[1]+1; j++)
                    if(i >= 0 && i < pixelWidth && j >= 0 & j < pixelHeight)
                        newBoard[i][j] = ''
        newBoard[to[0]][to[1]] = piece;
        newBoard[from[0]][from[1]] = '';
        updateBoard(newBoard);
    }

    let clicked = (i, j) => {
        console.log(`clicked [${i}, ${j}]`)
        console.log(`board[${i}][${j}] = ${board[i][j]}`);
        console.log(`selectedBoard[0][${i}][${j}] = ${selectedBoard[0][i][j]}`);
        if(board[i][j] == '' && selectedBoard[0][i][j]){
            movePiece(selectedBoard[1], [i, j])
            updateSelected([[...Array(pixelWidth)].map(_=>Array(pixelHeight).fill(false)), [0,0], !selectedBoard[2]]);
        }
        else if(Object.values(set[selectedBoard[2] ? 0 : (pixelHeight-1)]).includes(board[i][j]))
            selectPiece(i, j);
    }

    let startGame = () => {
        updateBoard([...Array(pixelWidth)].map(_=>Array(pixelHeight).fill('')));
        api.startNewGame();
        updateGameState({state: 'ongoing', menu: null, winner: false});
    }

    let visualBoard = []
    for(let j = 0; j < pixelHeight; j++){
        let row = []
        for(let i = 0; i < pixelWidth; i++)
            row.push((<div onClick={() => clicked(i, j)} style={{flex: 1, backgroundColor: selectedBoard[0][i][j] ? 'yellow' : (i%2+j)%2 == 0 ? 'tan' : 'brown'}}>{board[i][j] != 0 ? board[i][j] : ''}</div>))
        visualBoard.push([(<Box sx={{display: 'flex', flexDirection: 'row', flex: 1, justifyContent: 'space-evenly', height: `${1/pixelHeight}%`}}>{row}</Box>)])    
    }

    return (<div style={{display: 'flex', flexDirection: 'column', justifyContent:'space-evenly', borderColor: 'black', borderRadius:'5px', borderStyle: 'solid', borderwidth: '4px', width:'100%', height:'100%', userSelect: 'none'}}>
            {gameState.state != 'ongoing' ? gameState.menu : visualBoard}
        </div>)
}   