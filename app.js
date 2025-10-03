const displayEl = document.getElementById('display');
expression = prefix + '(-' + num + ')';
}
}
updateDisplay(expression);
}


function handlePercent(){
// convert last number to percentage: e.g. 50 -> (50/100)
const match = expression.match(/(.*?)([0-9.]+)$/);
if (match){
expression = match[1] + '(' + match[2] + '/100)';
updateDisplay(expression);
}
}


function handleEquals(){
if (!expression) return;
try{
const result = compute(expression);
expression = String(result);
updateDisplay(expression);
}catch(e){
updateDisplay('Error');
expression = '';
}
}


// --- Event delegation for keys ---
keysEl.addEventListener('click', (ev)=>{
const btn = ev.target.closest('button');
if (!btn) return;


const value = btn.getAttribute('data-value');
const action = btn.getAttribute('data-action');


// feedback always
playFeedback(btn);


if (action === 'clear') return handleClear();
if (action === 'equals') return handleEquals();
if (action === 'plusminus') return handlePlusMinus();
if (action === 'percent') return handlePercent();


if (value !== null){
handleInput(value);
}
});


// --- Keyboard support ---
window.addEventListener('keydown', (e)=>{
if (/^[0-9]$/.test(e.key) || ['+','-','*','/','.','(',')'].includes(e.key)){
// find corresponding button to animate
const btn = document.querySelector(`button[data-value='${e.key}']`);
if (btn) playFeedback(btn);
handleInput(e.key);
return;
}


if (e.key === 'Enter'){
const btn = document.querySelector(`#equals`);
if (btn) playFeedback(btn);
handleEquals();
}


if (e.key === 'Backspace'){
expression = expression.slice(0,-1);
updateDisplay(expression);
}


if (e.key === 'Escape'){
const btn = document.querySelector(`#clear`);
if (btn) playFeedback(btn);
handleClear();
}
});


// initial render
updateDisplay('');
