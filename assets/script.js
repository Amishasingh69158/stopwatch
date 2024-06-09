let timer;
let isRunning = false;
let elapsedTime = 0;
let lapTimes = {
    'MyStopWatchList':[],
    'amisha':[],
};
let currentLapArray = Object.keys(lapTimes).pop();

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsDiv = document.getElementById('laps');
const savedList = document.getElementById('savedList');
const createStopWatchList = document.getElementById('createStopWatchList');
const TimelistForm = document.getElementById('TimelistForm');
const createTimeListInput = document.getElementById('createTimeList');
const drop_content = document.getElementById('drop-content');
const currentSaveTime = document.getElementById('currentSaveTime');

function formatTime(time) {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function updateDisplay() {
    display.textContent = formatTime(elapsedTime);
}

function startStop() {
    if (isRunning) {
        clearInterval(timer);
        startStopBtn.textContent = 'Start';
    } else {
        timer = setInterval(() => {
            elapsedTime++;
            updateDisplay();
        }, 1000);
        startStopBtn.textContent = 'Stop';
    }
    isRunning = !isRunning;
}

function reset() {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    updateDisplay();
    lapsDiv.innerHTML = '';
    startStopBtn.textContent = 'Start';
}

// function lap() {
//     if (isRunning) {
//         lapTimes[currentLapArray].push(elapsedTime);
//         const lapDiv = document.createElement('div');
//         lapDiv.textContent = `Lap ${lapTimes[currentLapArray].length}: ${formatTime(elapsedTime)}`;
//         lapsDiv.appendChild(lapDiv);
//     }
// }

function saveTimeDisplay() {
    if (isRunning) {
        lapTimes[currentLapArray].push(elapsedTime);
        const lapDiv = document.createElement('div');
        lapDiv.textContent = `Lap ${lapTimes[currentLapArray].length}: ${formatTime(elapsedTime)}`;
        currentSaveTime.appendChild(lapDiv);
    }
    
}

function currentLapListName(){
    const savList = document.createElement('h3');
    currentSaveTime.innerHTML = '';
    savList.innerHTML = currentLapArray;
    currentSaveTime.appendChild(savList);
    lapTimes[currentLapArray].forEach((timer,index) =>{
        const lapDiv = document.createElement('div');
        lapDiv.textContent = `Lap ${index+1}: ${formatTime(timer)}`;
        currentSaveTime.appendChild(lapDiv);
    });
}

function displayListName(timeListName){
    currentLapArray = timeListName;
    currentLapListName();
}
function contentDropDown(){
    drop_content.innerHTML='';
    Object.keys(lapTimes).forEach(timeListName =>{
        const p_TimeList = document.createElement('p');
        p_TimeList.classList.add('pdropdown');
        p_TimeList.textContent = timeListName;
        p_TimeList.onclick = ()=> displayListName(timeListName);
        drop_content.appendChild(p_TimeList)

    });
    

}
startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
// lapBtn.addEventListener('click', lap);
lapBtn.addEventListener('dblclick', saveTimeDisplay); // Double-clicking the lap button saves the current time
TimelistForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const newTimeListName = createTimeList.value.trim();
    if(newTimeListName&&!lapTimes.hasOwnProperty(newTimeListName)){
        lapTimes[newTimeListName]=[];
        contentDropDown();
        displayListName(newTimeListName);
        createTimeListInput.value='';
    }else{
        alert('plese enter valid and unique')
    }


});
//dark styling toggle
const checkbox = document.getElementById("checkbox")
checkbox.addEventListener("change", () => {
  document.body.classList.toggle("dark");
});

contentDropDown();
currentLapListName();

// export {lapTimes};

// saveStopWatch //hidden

const showAllSaveList = document.getElementById('showAllSaveList');
const showAllSaveListHeading = document.getElementById('showAllSaveListHeading');
document.getElementById('savedTime').addEventListener('click',()=>{
    if(showAllSaveList.classList.contains('hidden')){
        displayList();
        showAllSaveList.classList.remove('hidden');
        showAllSaveListHeading.classList.remove('hidden');
    }else{
        showAllSaveList.classList.add('hidden');
        showAllSaveListHeading.classList.add('hidden');
    }

});
document.getElementById('goToStopWatchIndex').addEventListener('click',()=>{
        showAllSaveList.classList.add('hidden');
        showAllSaveListHeading.classList.add('hidden');

});

function displayList(){
    showAllSaveList.innerHTML='';
    Object.keys(lapTimes).forEach(timeListName =>{
        console.log(timeListName);
        const p_TimeList = document.createElement('p');
        p_TimeList.classList.add('saveList');
        p_TimeList.textContent = timeListName;
        p_TimeList.onclick = ()=> displayListName(timeListName);
        lapTimes[timeListName].forEach((timer,index) =>{
        const lapDiv = document.createElement('div');
        lapDiv.textContent = `Lap ${index+1}: ${formatTime(timer)}`;
        p_TimeList.appendChild(lapDiv);
        console.log(timer)
    });
        showAllSaveList.appendChild(p_TimeList);

    });
    
}

displayList();