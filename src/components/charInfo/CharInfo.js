import { useState, useEffect } from 'react';
import { useMarvelService } from '../../services/MarvelService';

import { Link } from 'react-router-dom/dist';

import { setContent } from '../../utils/setContent';

import './charInfo.scss';

export const CharInfo = (props) => {
    const [char, setChar] = useState(null);

    const {getCharacter, clearError, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateChar();
    }, [props.charId]);

    const updateChar = () => {
        clearError();

        const {charId} = props;
        if (!charId) {
            return;
        }

        getCharacter(charId)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'));
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    return (
        <div className="char__info">
            {setContent(process, View, char)}
        </div>
    )
}

const View = ({data}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = data;
    const actualComics = comics.length !== 0 ? null : 'There is no comics with this character!';

    let imgStyle = {'objectFit': 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit': 'contain'};
    }
    

    return (
        <>
            <div className="char__basics">
            <img src={thumbnail} alt={name} style={imgStyle}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">{description}</div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {actualComics}
                {
                    comics.map((item, i) => {
                        if (i < 10) return;

                        return (
                            <li className="char__comics-item" key={i}>
                                <Link 
                                    to={`/comics/${item.resourceURI.match(/\d+$/)[0]}`}
                                    target="_blank">
                                        {item.name}
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}