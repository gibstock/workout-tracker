// const days = document.querySelectorAll('.days')
const dayCount = document.querySelector('.day-count')
const countOutput = dayCount.querySelector('span')
const divSetting = localStorage.getItem('divSetting')
const currentLocalMonth = localStorage.getItem('currentLocalMonth')
const calendarContainer = document.querySelector('.calendar-container')
const monthTitle = document.querySelector('.month-title')
const monthTitleText = monthTitle.querySelector('h2')
const prevMonth = document.querySelector('.left-arrow')
const nextMonth = document.querySelector('.right-arrow')

let pushups = 'hsl(300, 80%, 70%)'
let dance = 'hsl(280, 80%, 70%)'
let fullWorkout = 'hsl(250, 80%, 70%)'
let reset = ''
let count;
const d = new Date()
let month = d.getMonth()
let year = d.getFullYear()
let daysInMonth = {january: 31, february: 28, march: 31, april: 30, may: 31, june: 30, july: 31, august: 31, september: 30, october: 31, november: 30, december: 31}
let spacer = [6,2,2,5,0,3,5,1,4,6,2,4]
let currentMonth = Object.keys(daysInMonth)[month]
let currentDayCount = Object.values(daysInMonth)[month]
let daySetting = [{
  [year]: [
    {
      [Object.keys(daysInMonth)[0]]: 
        [
          ...Array(daysInMonth.january)
        ]
    },
    {
      [Object.keys(daysInMonth)[1]]: 
        [
          ...Array(daysInMonth.february)
        ]
    },{
      [Object.keys(daysInMonth)[2]]: 
        [
          ...Array(daysInMonth.march)
        ]
    },{
      [Object.keys(daysInMonth)[3]]: 
        [
          ...Array(daysInMonth.april)
        ]
    },{
      [Object.keys(daysInMonth)[4]]: 
        [
          ...Array(daysInMonth.may)
        ]
    },{
      [Object.keys(daysInMonth)[5]]: 
        [
          ...Array(daysInMonth.june)
        ]
    },{
      [Object.keys(daysInMonth)[6]]: 
        [
          ...Array(daysInMonth.july)
        ]
    },{
      [Object.keys(daysInMonth)[7]]: 
        [
          ...Array(daysInMonth.august)
        ]
    },{
      [Object.keys(daysInMonth)[8]]: 
        [
          ...Array(daysInMonth.september)
        ]
    },{
      [Object.keys(daysInMonth)[9]]: 
        [
          ...Array(daysInMonth.october)
        ]
    },{
      [Object.keys(daysInMonth)[10]]: 
        [
          ...Array(daysInMonth.november)
        ]
    },{
      [Object.keys(daysInMonth)[11]]: 
        [
          ...Array(daysInMonth.december)
        ]
    },
  ]
  
}]
localStorage.clear();

const createCalendar = (month) => {
  if(document.querySelector('article')) {
    calendarContainer.removeChild(document.querySelector('article'))
  } 
  let article = document.createElement('article')
  article.id = Object.keys(daysInMonth)[month]
  if(spacer[month] === 0) {
    for(let i = 0; i < currentDayCount; i++) {
      let div = document.createElement('div')
      div.classList.add('days')
      let span = document.createElement('span')
      span.textContent = i + 1
      div.appendChild(span)
      article.appendChild(div)
    }
  } else {
    for(let i = 0; i < currentDayCount + 1; i++) {
      if(i === 0) {
        let div = document.createElement('div')
        div.classList.add('spacer')
        div.style.gridColumn = `1/${spacer[month] + 1}`
        article.appendChild(div)
      } else {
        let div = document.createElement('div')
        div.classList.add('days')
        let span = document.createElement('span')
        span.textContent = i
        div.appendChild(span)
        article.appendChild(div)
      }
    }
  }
  calendarContainer.appendChild(article)
  monthTitleText.textContent = Object.keys(daysInMonth)[month].toLocaleUpperCase();
}

const getClientSettings =(thisMonth, currentMonth) => {
  if(divSetting) {
    const days = document.querySelectorAll('.days')
    let getSetting = localStorage.getItem('divSetting');
    let parsedGetSetting = JSON.parse(getSetting)
    daySetting = [...parsedGetSetting]
    if(!daySetting[0][year][thisMonth][Object.keys(daysInMonth)[thisMonth]]) {
      return
    } else {
      daySetting[0][year][thisMonth][Object.keys(daysInMonth)[thisMonth]].forEach((setting, i) => {
        if(setting === null) return
        else if(setting.month === Object.keys(daysInMonth)[thisMonth]){
          days[setting.divIndex].style.backgroundColor = setting.bgColor
          days[setting.divIndex].setAttribute('data-state', setting.dataState)
        } else {
          return
        } 
      })
    }
    count = parseInt(localStorage.getItem('count'))
    countOutput.textContent = count
  } else {
    daySetting = [{
      [year]: [
        {
          [Object.keys(daysInMonth)[0]]: 
            [
              ...Array(daysInMonth.january)
            ]
        },
        {
          [Object.keys(daysInMonth)[1]]: 
            [
              ...Array(daysInMonth.february)
            ]
        },{
          [Object.keys(daysInMonth)[2]]: 
            [
              ...Array(daysInMonth.march)
            ]
        },{
          [Object.keys(daysInMonth)[3]]: 
            [
              ...Array(daysInMonth.april)
            ]
        },{
          [Object.keys(daysInMonth)[4]]: 
            [
              ...Array(daysInMonth.may)
            ]
        },{
          [Object.keys(daysInMonth)[5]]: 
            [
              ...Array(daysInMonth.june)
            ]
        },{
          [Object.keys(daysInMonth)[6]]: 
            [
              ...Array(daysInMonth.july)
            ]
        },{
          [Object.keys(daysInMonth)[7]]: 
            [
              ...Array(daysInMonth.august)
            ]
        },{
          [Object.keys(daysInMonth)[8]]: 
            [
              ...Array(daysInMonth.september)
            ]
        },{
          [Object.keys(daysInMonth)[9]]: 
            [
              ...Array(daysInMonth.october)
            ]
        },{
          [Object.keys(daysInMonth)[10]]: 
            [
              ...Array(daysInMonth.november)
            ]
        },{
          [Object.keys(daysInMonth)[11]]: 
            [
              ...Array(daysInMonth.december)
            ]
        },
      ]
      
    }]
    count = 0;
  }
}

const clickDays = (currMonth) => {
  const days = document.querySelectorAll('.days')
    days.forEach((day, i) => {
      day.addEventListener('click', (e)=> {
        if(!day.style.backgroundColor) {
          day.style.backgroundColor = pushups
          day.setAttribute('data-state', 'pushups')
          day.setAttribute('data-arrIndex', i)
          count +=1
          countOutput.textContent = count
          daySetting[0][year][currMonth][Object.keys(daysInMonth)[currMonth]][i] = {
              divIndex: i,
              dataState: 'pushups',
              bgColor: pushups,
              month: Object.keys(daysInMonth)[currMonth]
            }
          let arrStr = JSON.stringify(daySetting)
          localStorage.setItem('divSetting', arrStr)
          localStorage.setItem('count', count)
        } else if (day.dataset.state === 'pushups') {
          day.style.backgroundColor = dance
          day.setAttribute('data-state', 'dance')
          day.setAttribute('data-arrIndex', i)
          daySetting[0][year][month][Object.keys(daysInMonth)[month]][i] = {
            divIndex: i,
            dataState: 'dance',
            bgColor: dance,
            month: Object.keys(daysInMonth)[currMonth]
          }
          let arrStr = JSON.stringify(daySetting)
          localStorage.setItem('divSetting', arrStr)
          localStorage.setItem('count', count)
        } else if (day.dataset.state === 'dance') {
          day.style.backgroundColor = fullWorkout
          day.setAttribute('data-state', 'fullWorkout')
          day.setAttribute('data-arrIndex', i)
          daySetting[0][year][month][Object.keys(daysInMonth)[month]][i] = {
            divIndex: i,
            dataState: 'fullWorkout',
            bgColor: fullWorkout,
            month: Object.keys(daysInMonth)[currMonth]
    
          }
          let arrStr = JSON.stringify(daySetting)
          localStorage.setItem('divSetting', arrStr)
          localStorage.setItem('count', count)
        } else if (day.dataset.state === 'fullWorkout') {
          day.style.backgroundColor = reset
          day.removeAttribute('data-state')
          daySetting[0][year][month][Object.keys(daysInMonth)[month]][i] = undefined
          day.removeAttribute('data-arrIndex')
          let arrStr = JSON.stringify(daySetting)
          localStorage.setItem('divSetting', arrStr)
          count -= 1
          countOutput.textContent = count
          localStorage.setItem('count', count)
        }
      })
    })
}

window.addEventListener('DOMContentLoaded', ()=> {
  if(currentLocalMonth) {
    console.log('found curLoMo')
    if(currentLocalMonth === month) {
      return
    } 
    else {
      return
    }
  } else {
    createCalendar(month)
   
  }
  getClientSettings(month, currentMonth)
  clickDays(month)
  

  // const insertAt = (array, index, ...elementsArray) => {
  //   array.splice(index, 0, ...elementsArray)
  // }
  
  prevMonth.addEventListener('click', () => {
    if((month - 1) < 0) {
      month = 0
    }else {
      month -= 1
    }
    createCalendar(month)
    getClientSettings(month, currentMonth)
    clickDays(month)
  })
  
  nextMonth.addEventListener('click', () => {
    if((month + 1) > 11) {
      month = 11
    }else {
      month += 1
    }
    createCalendar(month)
    getClientSettings(month, currentMonth)
    clickDays(month)
  })
})
