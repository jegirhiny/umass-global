import { useState } from "react";

const useFlipState = () => {
    const [ flipped, setFlipped ] = useState(true);
 
    const flipCard = () => {
        setFlipped(flipped => !flipped)
    }

    return [ flipped, flipCard ];
}

export default useFlipState;