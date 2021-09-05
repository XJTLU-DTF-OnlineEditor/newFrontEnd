import { request } from 'umi'

export const run = async (inputType, source, input, lang, id, terminate) => {
    const url = 'http://localhost:8001/api/V1/editor/run'
    console.log(inputType + source + input + lang + id + terminate);
    return request(url, {
        method: 'post',
        data: {
            id,
            terminate,
            lang,
            inputType,   //split interactive
            source,
            input,
            memory_limit: 243232,
            time_limit: 5
        }
    })
}

export const send = async (inputType, source, input, lang, id, terminate) => {
    const url = 'http://localhost:8001/api/V1/editor/run'
    return request(url, {
        method: 'post',
        data: {
            id,
            lang,
            terminate,
            inputType,
            source,
            input,
            memory_limit: 243232,
            time_limit: 5
        }
    })
}

