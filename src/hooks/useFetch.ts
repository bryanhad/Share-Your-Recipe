import { useState, useEffect } from 'react'
import { getErrorMessage } from '../lib/getErrorMessage'
import { OptionsType } from '../types/Types'


export function useFetch<T> (url:string, method = 'GET') {
    const [data, setData] = useState<T | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [options, setOptions] = useState<OptionsType | null>(null)

    const postData = (data:any) => {
        setOptions({
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(data)
        })
    }

    useEffect(() => {
        // const controller = new AbortController()

        async function fetchData (fetchOptions?:OptionsType)  {
            setIsLoading(true)
            try {
                const res = await fetch(url, {...fetchOptions})
                if (!res.ok) {
                    throw new Error(res.status.toString())
                }
                const resObj = await res.json()
                setIsLoading(false)
                setData(resObj)
                setError(null)
            } catch (err) {
                const errorMessage = getErrorMessage(err)
                setIsLoading(false)
                setError(`Something wrong while fetching the data! status:${errorMessage}`)
            }
        }

        if (method === 'GET') {
            fetchData()
        } else if (method === 'POST' && options) {
            fetchData(options)
        }

        // clean up function kalo misal component yg make hook ini ke unmount.. di clean up biar fetchnya g dilanjutin / di abort
        // return () => {
        //     controller.abort()
        // }
    }, [url, options, method])

    return {data, isLoading, error, postData}
}