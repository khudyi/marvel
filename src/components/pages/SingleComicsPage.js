import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom/dist';
import { useMarvelService } from '../../services/MarvelService';

import { Spinner } from '../spinner/Spinner';
import { ErrorMessage } from '../errorMessage/ErrorMessage';

import './pageStyles/singleComicsPage.scss';

export const SingleComics = () => {
    const {comicsId} = useParams();
    const [comics, setComics] = useState(null);

    const {loading, error, getComics, clearError} = useMarvelService();

    useEffect(() => {
        updateComics();
    }, [comicsId]);

    const updateComics = () => {
        clearError();

        getComics(comicsId)
            .then(onComicsLoaded);
    }

    const onComicsLoaded = (id) => {
        setComics(id);
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !comics) ? <View comics={comics}/> : null;


    return (
        <div className="single-comic">
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

const View = ({comics}) => {
    const {id, title, description, pageCount, thumbnail, language, price} = comics;

    return (
        <>
            <img src={thumbnail} alt={id} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">Number of pages: {pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </>
    )
}