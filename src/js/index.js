const days = document.querySelectorAll('.days')
const dayCount = document.querySelector('.day-count')
const countOutput = dayCount.querySelector('span')
const divSetting = localStorage.getItem('divSetting')
let pushups = 'hsl(300, 80%, 70%)'
let dance = 'hsl(280, 80%, 70%)'
let fullWorkout = 'hsl(250, 80%, 70%)'
let reset = ''
let count;
let daysInMonth = 31
let daySetting = [...Array(daysInMonth)]
localStorage.clear();
window.addEventListener('DOMContentLoaded', ()=> {
  if(divSetting) {
    let getSetting = localStorage.getItem('divSetting');
    let parsedGetSetting = JSON.parse(getSetting)
    daySetting = [...parsedGetSetting]
    daySetting.forEach((setting) => {
      if(setting === null) return
      else {
        days[setting.divIndex].style.backgroundColor = setting.bgColor
        days[setting.divIndex].setAttribute('data-state', setting.dataState)

      }

      
    })
    count = parseInt(localStorage.getItem('count'))
    countOutput.textContent = count
    console.log(count)
  } else {
    daySetting = [...Array(daysInMonth)]
    count = 0;
    console.log(daySetting)
  }

})

const insertAt = (array, index, ...elementsArray) => {
  array.splice(index, 0, ...elementsArray)
  console.log(array)
}
days.forEach((day, i) => {
  day.addEventListener('click', (e)=> {
    console.log('click')
    if(!day.style.backgroundColor) {
      day.style.backgroundColor = pushups
      day.setAttribute('data-state', 'pushups')
      day.setAttribute('data-arrIndex', i)
      count +=1
      countOutput.textContent = count
      daySetting[i] = {
          divIndex: i,
          dataState: 'pushups',
          bgColor: pushups
        }
      let arrStr = JSON.stringify(daySetting)
      localStorage.setItem('divSetting', arrStr)
      localStorage.setItem('count', count)
      console.log(daySetting)
    } else if (day.dataset.state === 'pushups') {
      day.style.backgroundColor = dance
      day.setAttribute('data-state', 'dance')
      day.setAttribute('data-arrIndex', i)
      daySetting[i] = {
        divIndex: i,
        dataState: 'dance',
        bgColor: dance
      }
      console.log(daySetting)
      let arrStr = JSON.stringify(daySetting)
      localStorage.setItem('divSetting', arrStr)
      localStorage.setItem('count', count)
    } else if (day.dataset.state === 'dance') {
      day.style.backgroundColor = fullWorkout
      day.setAttribute('data-state', 'fullWorkout')
      day.setAttribute('data-arrIndex', i)
      daySetting[i] = {
        divIndex: i,
        dataState: 'fullWorkout',
        bgColor: fullWorkout

      }
      let arrStr = JSON.stringify(daySetting)
      localStorage.setItem('divSetting', arrStr)
      localStorage.setItem('count', count)
    } else if (day.dataset.state === 'fullWorkout') {
      day.style.backgroundColor = reset
      day.removeAttribute('data-state')
      daySetting[i] = undefined
      day.removeAttribute('data-arrIndex')
      let arrStr = JSON.stringify(daySetting)
      localStorage.setItem('divSetting', arrStr)
      count -= 1
      countOutput.textContent = count
      localStorage.setItem('count', count)
      console.log(daySetting)
    }
  })
})