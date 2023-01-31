import { setSelectionRange } from '@testing-library/user-event/dist/utils';
import {useState} from 'react'
export default function FunnyChess(props) {
    const width = 30;
    const height = 30;
    const pixelHeight = 12;
    const pixelWidth = 12;
    const moves = {
        pawn: [[1,0],[-1,0],[0,-1],[0,1]],
        knight: [[2,2],[1,1],[-2,-2],[-1,-1],[-2,2],[-1,1],[2,-2],[1,-1]],
        king: [],
        queen: [],
        rook: [[2, 2], [1,1], [0,2], [-1, 1], [-2, 2], [2, 0], [-2, 0], [2, -2], [1, -1], [0, -2], [-1, -1], [-2, -2]],
        bishop: [[0, 1], [0, 2], [0, -1], [0, -2], [1, 0], [-1, 0]]

    }
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
        newBoard[to[0]][to[1]] = piece;
        newBoard[from[0]][from[1]] = '';
        updateBoard(newBoard);
    }

    let clicked = (i, j) => {
        console.log(`clicked [${i}, ${j}]`)
        if(board[i][j] == '' && selectedBoard[0][i][j]){
            movePiece(selectedBoard[1], [i, j])
            updateSelected([[...Array(pixelWidth)].map(_=>Array(pixelHeight).fill(false)), [0,0], !selectedBoard[2]]);
        }
        else if(Object.values(set[selectedBoard[2] ? 0 : (pixelHeight-1)]).includes(board[i][j]))
            selectPiece(i, j);
    }

    let visualBoard = []
    for(let j = 0; j < pixelHeight; j++){
        let row = []
        for(let i = 0; i < pixelWidth; i++)
            row.push((<div onClick={() => clicked(i, j)} style={{width: `${width/pixelWidth}vw`, height: `${height/pixelHeight}vh`, backgroundColor: selectedBoard[0][i][j] ? 'yellow' : (i%2+j)%2 == 0 ? 'tan' : 'brown'}}>{board[i][j] != 0 ? board[i][j] : ''}</div>))
        visualBoard.push([(<div style={{display: 'flex', flexDirection: 'row'}}>{row}</div>)])    
    }
    return (<div>
            {visualBoard}
        </div>)
}   