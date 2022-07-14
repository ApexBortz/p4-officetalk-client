import { useEffect, useState } from 'react'

const PREFIX = 'OfficeTalk'

const Localstorage = (key, initialValue) => {
    const prefixKey = PREFIX + key
    const [ value, setValue ] = useState(() => {
        const jsonValue = localStorage.getItem(prefixKey)
        if (jsonValue != null) {
            return JSON.parse(jsonValue)
        }
    })
}

export default Localstorage