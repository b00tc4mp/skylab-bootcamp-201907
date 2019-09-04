
function selecbpm(){
    const tempo = document.getElementById('tempo').value
    Tone.Transport.bpm.value = tempo || 280
}
   

    
function sequencer(){
    const kick = new Tone.Player('./kick-acoustic01.wav').toMaster();
    const snare = new Tone.Player('./snare-acoustic01.wav').toMaster();
    const hithat = new Tone.Player('./hihat-acoustic01.wav').toMaster();
    const tom1 = new Tone.Player('./tom-acoustic01.wav').toMaster();
    const tom2 = new Tone.Player('./tom-acoustic02.wav').toMaster();
    const crash = new Tone.Player('./crash-acoustic.wav').toMaster();

    
    let index = 0;
    
    Tone.Transport.scheduleRepeat(repeat,"16n")
    Tone.Transport.start();

    function repeat(){
        let step = index % 16;
        let kickInputs = document.querySelector(`.kick input:nth-child(${step + 1})`
        );
        let snareInputs = document.querySelector(`.snare input:nth-child(${step + 1})`
        );
        let hithatInputs = document.querySelector(`.hithat input:nth-child(${step + 1})`
        );
        let tom1Inputs = document.querySelector(`.tom1 input:nth-child(${step + 1})`
        );
        let tom2Inputs = document.querySelector(`.tom2 input:nth-child(${step + 1})`
        );
        let crashInputs = document.querySelector(`.crash input:nth-child(${step + 1})`
        );
        if(kickInputs.checked){
            kick.start();

        }
        if(snareInputs.checked){
            snare.start()
        }
        if(hithatInputs.checked){
            hithat.start()
        }
        if(tom1Inputs.checked){
            tom1.start()
        }
        if(tom2Inputs.checked){
            tom2.start()
        }
        if(crashInputs.checked){
            crash.start()
        }
        
        index++
    }
}
sequencer()




