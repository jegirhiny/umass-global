import { useState} from "react";
import {v1 as uuid} from "uuid";
import axios from "axios";

const useAxios = (baseURL) => {
    const [cards, setCards] = useState([]);

    async function fetchCard(endpoint = '') {
        const res = await axios.get(baseURL + endpoint);

        setCards([...cards, { ...res.data, id: uuid() }]);
    }

    return [ cards, fetchCard ];
}

export default useAxios;