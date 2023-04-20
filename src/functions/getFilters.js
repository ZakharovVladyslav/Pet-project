'use strict'

import Controller from "./Controller.js"

export default function getFilters(headers) {
    Controller.instance.editCore('firstDate', document.querySelector('#left-date-inp'))
    Controller.instance.editCore('secondDate', document.querySelector('#right-date-inp'))

    let data = [...Controller.instance.core.dataArray]

    if (Controller.instance.core.firstDate.value.length !== 0 && Controller.instance.core.secondDate.value.length !== 0) {
        const select = document.getElementById('date-params')
        const opt = select.options[select.selectedIndex].value

        const revertDate = (date) => {
            const arr = date.split('-').reverse()

            return `${+arr[1]}/${+arr[0]}/${+arr[2]}`
        }

        const leftDateArr = revertDate(Controller.instance.core.firstDate.value)
        const rigthDateArr = revertDate(Controller.instance.core.secondDate.value)

        data = data.filter(elem => {
            if (elem[opt] !== undefined) {
                let targetDate = elem[opt].split('')

                if (targetDate.length > 10) {
                    targetDate.length = 10

                    targetDate = targetDate.join('').split('.')

                    let date = `${+targetDate[0]}/${+targetDate[1]}/${+targetDate[2]}`

                    if (new Date(leftDateArr) <= new Date(date) && new Date(date) <= new Date(rigthDateArr)) {
                        return elem
                    }
                }
            }
        })
    }

    let inputFields = [
        document.querySelector('#filter-input-1'),
        document.querySelector('#filter-input-2'),
        document.querySelector('#filter-input-3'),
        document.querySelector('#filter-input-4'),
        document.querySelector('#filter-input-5')
    ]
    let filteredArray = []

    inputFields = inputFields.filter(field => field.value !== '')

    const values = inputFields.map(filter => {
        if (filter.value !== '')
            return filter.value
    }).filter(filter => filter !== undefined)

    let keys = []

    data.forEach(obj => {
        values.forEach(value => {
            Object.keys(obj).forEach(key => {
                if (obj[key] === value) {
                    keys.push(key)
                }
            })
        })
    })

    keys = Array.from(new Set(keys))

    filteredArray = data.filter(obj => {
        return keys.every(key => {
            return values.includes(obj[key])
        })
    })

    filteredArray.unshift(headers)

    return filteredArray
}
