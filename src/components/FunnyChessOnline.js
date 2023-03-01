import { Box, Button, FormControl, TextField, Grid } from '@mui/material';
import {useEffect, useState, useRef} from 'react'
import api from '../Requests'

export default function FunnyChess(props) {
    const moves = {
        pawn: [[1,0],[-1,0],[0,-1],[0,1]],
        knight: [[2,2],[1,1],[-2,-2],[-1,-1],[-2,2],[-1,1],[2,-2],[1,-1]],
        king: [],
        queen: [],
        rook: [[2, 2], [1,1], [0,2], [-1, 1], [-2, 2], [2, 0], [-2, 0], [2, -2], [1, -1], [0, -2], [-1, -1], [-2, -2]],
        bishop: [[0, 1], [0, 2], [0, -1], [0, -2], [1, 0], [-1, 0]]
    }
    const set = {'white': {king: '♔', queen: '♕', knight: '♘', bishop: '♗', rook: '♖', pawn: '♙'}, 'black': {king: '♚', queen: '♛', knight: '♞', bishop: '♝', rook: '♜', pawn: '♟'}}
    const [state, setState] = useState({state: 'menu', board: [[]], color: undefined, id: undefined, errorMessage: ''});
    const [selectedBoard, updateSelected] = useState([[...Array(13)].map(_=>Array(13).fill(false)), [0,0]]);
    const [joinId, setJoin] = useState('')
    const statesThatPollBoard = ['started', 'myTurn', 'yourTurn'];
    const stateRef = useRef(state);
    stateRef.current = state;

    useEffect(() => {

        async function getBoard(){
            let board = await api.getBoard(stateRef.current.id);
            if(board.status != 200) return;
            const data = board.data;
            console.log('data = ');
            console.log(data)
            if(data != stateRef.current.board){
                setState(state => {return {...state, state: data[1], board: data[0]}});
            }
        }
        const interval = setInterval(() => {
            if(statesThatPollBoard.includes(stateRef.current.state))
                getBoard();
          }, 1000);
        
          return () => clearInterval(interval);
        }, [])

    async function startGame(){
        let response = await (api.startNewGame());
        console.log(response)
        if(response.status != 200)
            setState({...state, state: 'error', errorMessage: response.data});
        else
            setState({...state, state:'started', color: 'black', id: response.data});
    }

    async function joinGame(){
        let response = await api.joinGame(joinId);
        if(response.status != 200){
            setState({...state, state: 'error', errorMessage: response.data.data});
        }else
            setState({...state, state:'started', id: joinId});
    }

    let selectPiece = (i, j) => {
        let newSelectedBoard = [...Array(13)].map(_=>Array(13).fill(false))
        switch(state.board[i][j]){
            case set['white'].pawn: // pawn can only move 1 space in cardinal direction (NSEW)
            case set['black'].pawn:
                for(let move of moves.pawn){
                    if(i+move[0] >= 0 && i+move[0] < 13 && j+move[1] >= 0 && j+move[1] < 13)
                        newSelectedBoard[i+move[0]][j+move[1]] = true;
                }
                break;
            case set['white'].knight: // knights can move 2 spaces diagonal
            case set['black'].knight:
                for(let move of moves.knight){
                    if(i+move[0] >= 0 && i+move[0] < 13 && j+move[1] >= 0 && j+move[1] < 13)
                        newSelectedBoard[i+move[0]][j+move[1]] = true;
                }
                break;
            case set['white'].king:
            case set['black'].king: // king cant move
                break;
            case set['black'].queen:
            case set['white'].queen: // queen can move anywhere on the newSelectedBoard (She doesnt capture she just teleports and can block others)
                newSelectedBoard = [...Array(13)].map(_=>Array(13).fill(true));
                break;
            case set['white'].rook:
            case set['black'].rook: // rook can in like a checkered square
            /*
                X-O-X-O-X
                O-X-O-X-O
                X-O-R-O-X
                O-X-O-X-O
                X-O-X-O-X
                Rook can move to any X's
            */ 
                for(let move of moves.rook){
                    if(i+move[0] >= 0 && i+move[0] < 13 && j+move[1] >= 0 && j+move[1] < 13)
                        newSelectedBoard[i+move[0]][j+move[1]] = true;
                }

                break;
            case set['black'].bishop:
            case set['white'].bishop: // Has a spin attack (kills any pieces adjacent to it when moving, moved 2 spaces forward or backwards, or 1 space left or right)
                for(let move of moves.bishop){
                    if(i+move[0] >= 0 && i+move[0] < 13 && j+move[1] >= 0 && j+move[1] < 13)
                        newSelectedBoard[i+move[0]][j+move[1]] = true;
                }
                break;
        }
        updateSelected([newSelectedBoard, [i,j]]); // set to true to say next click will be actually moving piece
    }


    function clicked(i, j){
        console.log(`clicked [${i}, ${j}]`)
        console.log(`board[${i}][${j}] = ${state.board[i][j]}`);
        console.log(`selectedBoard[0][${i}][${j}] = ${selectedBoard[0][i][j]}`);
        if(state.board[i][j] == '' && selectedBoard[0][i][j]){
            //movePiece(selectedBoard[1], [i, j]) // move piece here
            api.movePiece(state.id, {from: selectedBoard[1], to: [i, j]})
            updateSelected([[...Array(13)].map(_=>Array(13).fill(false)), [0,0]]);
        }
        else if(state.state == 'myTurn' && Object.values(set[state.color]).includes(state.board[i][j]))
            selectPiece(i, j);
    }


    let display = [];
    switch(state.state){
        case 'menu':
            display = (
                <Box>
                    <Grid container>
                        <Grid item xs={12}>Create or join a game to start.</Grid>
                        <Grid item xs={6}><Button onClick={() => startGame()}>Create a Game</Button></Grid>
                        <Grid item xs={6}><Button onClick={() => setState({...state, state: 'joining', color: 'white'})}>Join a Game</Button></Grid>
                    </Grid>
                </Box>
            );
            break;
        case 'joining':
            display = (
                <Grid container>
                    <Grid item xs={12}><Button onClick={() => setState({...state, state: 'menu'})}>Go back</Button></Grid>
                    <Grid item xs={12}><TextField onChange={(event) => setJoin(event.target.value)} label="Game ID"/></Grid>
                    <Grid item xs={12}><Button onClick={(() => joinGame())}>Submit</Button></Grid>
                </Grid>
            )
            break;
        case 'started':
            break;
        default: 
                // TODO: render the chess board here
                console.log(state);
                for(let i = 0; i < 13; i++){
                    let row = []
                    for(let j = 0; j < 13; j++)
                        row.push((<div onClick={() => clicked(i, j)} style={{flex: 1, backgroundColor: selectedBoard[0][i][j] ? 'yellow' : (i%2+j)%2 == 0 ? 'tan' : 'brown'}}>{state.board[i][j] != 0 ? state.board[i][j] : ''}</div>))
                    display.push([(<Box sx={{display: 'flex', flexDirection: 'row', flex: 1, justifyContent: 'space-evenly', height: `${1/13}%`}}>{row}</Box>)])    
                }
                display = (<div style={{display: 'flex', flexDirection: 'column', justifyContent:'space-evenly', borderColor: 'black', borderRadius:'5px', borderStyle: 'solid', borderwidth: '4px', width:'100%', height:'100%', userSelect: 'none'}}>
                    {display}
                </div>)
    }


    return (
        <div style={{height: '100%', width: '100%'}}>
            {display}
        </div>
    )
}