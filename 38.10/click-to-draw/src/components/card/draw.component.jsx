import "./draw.styles.css";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";

const Draw = () => {
    const [ deckID, setDeckID ] = useState(null);
    const [ drawn, setDrawn ] = useState([]);
    const [ zIndex, setZIndex ] = useState(0);

    async function getCard() {
        try {
            const card = await axios.get(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`);

            setDrawn([...drawn, {
                image: card.data.cards[0].image,
                degrees: Math.random() * 361,
                index: zIndex
            }]);

            setZIndex(prevZIndex => prevZIndex + 1);
        } catch (e) {
            alert('Error: No Cards Remaining!');
        }
    }

    async function getNewDeck() {
        try {
            const deck = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');

            setDeckID(deck.data.deck_id);
        } catch (e) {
            console.error('Error Fetching Deck:', e)
        }
    }

    useEffect(function getDeckWhenMounted() {
        getNewDeck();
    }, []);

    return (
        <Fragment>
            <div className="b-cont">
                <button onClick={() => getCard()}>Draw Card</button>
                <button onClick={() => getNewDeck()}>Create New Deck</button>
            </div>
            <div className="c-cont">
                { drawn.map((card, index) => <img key={index} style={{transform: `rotate(${card.degrees}deg)`, zIndex: card.index}} src={ card.image } />) }
            </div>
        </Fragment>
    );
}

export default Draw;