import { tsAnyKeyword } from '@babel/types';
import { Box, Button, Grid, TextField } from '@mui/material'
import { useContext, useState, useRef, useLayoutEffect } from 'react'
import {TextInput} from 'react-native';
import "../resources/fonts/MinecraftRegular-Bmg3.otf"

export default function Terminal(props){
    const screenHeight = 26;
    const [logs, setLogs] = useState(["Type 'help' for a list of commands!"])
    const [credentials, setCred] = useState(['',''])
    const [dimensions, setDim] = useState(0)
    const terminalRef = useRef(null)
    const [helpCount, setHelp] = useState(0)
    const blacklist = ['login', 'register'];
    const helpText = {
        help: "help\t- Display a list of avalible commands.",
        man: "man\t- Display information about a command.",
        login: "login\t- Log into an existing account.",
        register: "register\t- Register a new account.",
        ping: "ping\t- Pong!",
        aboutme: "aboutme\t- Some information about me! :)",
        whoareyou: "whoareyou\t- Some information about me! :)",
    }
    const allowedHelp = Object.keys(helpText).filter((key) => !blacklist.includes(key)).reduce((accumulator, key) => [helpText[key], ...accumulator], [])
    // need to figure out how to keep focus only if you hit enter in terminal


    useLayoutEffect(() => {

        function handleResize(){
            // this is too laggy
            //setDim([terminalRef.current.clientWidth, terminalRef.current.clientHeight]);
        }
        window.addEventListener('resize', handleResize);
    })

    let handleText = (event) => {
        if(event.key == 'Enter' && event.target.value.trim()){
            parseText(event.target.value)
            event.target.value = ""
        }
    }

    let addToLogs = (text) => {
        let newLogs = [...logs, ...text]
        let limit = Math.ceil(dimensions[1]/30) // set denominator to control # of printed lines.
        if(newLogs.length > limit) 
            newLogs = newLogs.slice(-limit)
        setLogs(newLogs)
        
    }

    let handleClick = (event) => {
        console.log("clicked")
        terminalRef.current.focus();
    }

    let cred;
    let parseText = (text) => {
        let words = text.split(' ')
        words[0] == 'help' ? setHelp(helpCount+1) : setHelp(0)
        if(blacklist.includes(words[0])){
            addToLogs(`Sorry, ${words[0]} is not supported.`);
            return;
        }
        switch(words[0]){
            case 'help':
                if(helpCount < 2){
                    words[1] = isNaN(parseInt(words[1])) ? 1 : parseInt(words[1]);
                    words[1] = isNaN(words[1]) && Number(words[1]) > 0 ? 1 : words[1];
                    addToLogs([text, `---COMMANDS Page ${words[1]}---`, ...allowedHelp.slice((words[1]-1) * screenHeight, words[1] * screenHeight).reverse()]);
                }
                else
                    addToLogs([text, `Why have you called help ${helpCount+1} times?`])
                break;

            case 'man':
                if(words[1] == "login"){
                    addToLogs([text,
                        "---MANUEL---",
                        "login",
                        "\t-u username",
                        "\t\tThe username used to log in.",
                        "\t-p password",
                        "\t\tThe password used to log in."
                    ])
                }else if(words[1] == "register"){
                    addToLogs([text,
                        "---MANUEL---",
                        "login",
                        "\t-u username",
                        "\t\tThe username for your account.",
                        "\t-p password",
                        "\t\tThe password for your account.", 
                        "\t-c",
                        "\t\tConfirm your accounts password."
                    ])
                }else if(words[1] == 'help'){
                    addToLogs([text,
                        "---MANUEL---",
                        "help",
                        "\tThere are no flags or arguments for help"
                    ])
                }else if(words[1] == 'man'){
                    addToLogs([text,
                        "---MANUEL---",
                        "man",
                        "\t{COMMAND}",
                        "\t\tThe command to recieve more information on."
                    ])
                }else if(words[1] == undefined){
                    addToLogs([text,'Syntax: man {COMMAND}'])
                }else{
                    addToLogs([text,`Command '${words[1]}' not found.`])
                }

                break;
            case 'login': 
                cred=[]
                cred[0] = words[Number(words.indexOf('-u'))+1]
                cred[1] = words[Number(words.indexOf('-p'))+1]
                addToLogs([text,`Username = ${cred[0]}`, `Password = ${cred[1]}`])
                setCred(cred)
                break;
            case 'register':
                cred = []
                cred[0] = words[Number(words.indexOf('-u'))+1]
                cred[1] = words[Number(words.indexOf('-p'))+1]
                cred[2] = words[Number(words.indexOf('-c'))+1]
                addToLogs([text,`Username = ${cred[0]}`, `Password = ${cred[1]}`, `Passwordx2 = ${cred[2]}`])
                setCred(cred)
                break;
            case 'ping':
                addToLogs([text,"pong"])
                break;
            case 'whoareyou':
            case 'aboutme':
                addToLogs([text, "TODO: Copy about me paragraph here"]);
                break;
            default:
                addToLogs([text, `Command '${words[0]}' not found.`])
                break;
        }

    }

    return(
        <Button 
        onClick={handleClick}
        disableRipple
        style={{textTransform: 'none'}}
        >
            <Box 
                sx={{
                        width: '43vw',
                        height: '60vh',
                        backgroundColor: 'black',
                        border: 25,
                        borderColor: 'yellow',
                        display: 'flex',
                        flexDirection: 'column',
                        color: 'white',
                        borderRadius: "15px"
                    }}
                style={{textAlign: "left"}}
            >
                <Box sx={{paddingLeft: '5px', display: 'flex', flexDirection: 'column'}}> 
                    {logs.map(line => (<span style={{fontFamily: "Minecraft"}}>{line}</span>))}
                    <Box sx={{display: 'flex', flexDirection: 'row'}}>
                        {<span style={{fontFamily: "Minecraft"}}>{'>'}</span>}
                        <TextInput 
                            ref={terminalRef} 
                            type='text'
                            style={{ 
                                color: 'white', 
                                backgroundColor: 'black', 
                                borderStyle: 'none', 
                                outline: 'none', 
                                width: `${dimensions[0]-10}px`,
                                fontFamily: "Minecraft"
                            }} 
                            onKeyPress={handleText}/> 
                    </Box>
                </Box>
            </Box>
        </Button>
    )
}