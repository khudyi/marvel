import React, { useState, useEffect, useRef } from 'react';
import { useMarvelService } from '../../services/MarvelService';

import './charList.scss';
import { Spinner } from '../spinner/Spinner';
import { ErrorMessage } from '../errorMessage/ErrorMessage';

const setContent = (process, Component, newItemLoading) => {
    switch(process) {
        case 'waiting':
            return <Spinner/>;
        
        case 'loading':
            return newItemLoading ? <Component/> : <Spinner/>;

        case 'confirmed':
            return <Component/>;

        case 'error':
            return <ErrorMessage/>;

        default:
            throw new Error('Unexpected process state!');
    }
}

export const CharList = (props) => {
    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const {getAllCharacters, process, setProcess} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, []);

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);

        getAllCharacters(offset)
            .then(onCharListLoaded)
            .then(() => setProcess('confirmed'));
    }

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        setCharList((charList) => [...charList, ...newCharList]);
        setNewItemLoading(false);
        setOffset((offset) => offset + 9);
        setCharEnded(ended);
    }

    const refsOfChars = useRef([]);

    const focusOnItem = (id) => {
        refsOfChars.current.forEach((item) => {
            item.classList.remove('char__item_selected');
        });

        refsOfChars.current[id].classList.add('char__item_selected');
        refsOfChars.current[id].focus();
    }

    function renderItems(arr) {
        const items = arr.map((item, index) => {
            let imgStyle = {'objectFit': 'cover'};

            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit': 'unset'};
            }

            return (
                <li className='char__item'
                tabIndex={0}
                    key={index}
                    ref={(el) => refsOfChars.current[index] = el}
                    onClick={() => {props.onCharSelected(item.id); 
                                    focusOnItem(index)
                                }}
                    onKeyPress={(e) => {
                        if (e.key === ' ' || e.key === 'Enter') {
                            props.onCharSelected(item.id);
                            focusOnItem(index);
                        }
                    }}>
                        <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                        <div className='char__name'>
                            {item.name}
                        </div>
                </li>
            )
        });

        return (
            <ul className='char__grid'>
                {items}
            </ul>
        )
    }

    return (
        <div className="char__list">
            {setContent(process, () => renderItems(charList), newItemLoading)}

            <button 
                className='button button__main button__long'
                disabled={newItemLoading}
                style={{'display': charEnded ? 'none' : 'block'}}
                onClick={() => onRequest(offset)}>
                <div className="inner">Load More</div>
            </button>
        </div>
    )
}