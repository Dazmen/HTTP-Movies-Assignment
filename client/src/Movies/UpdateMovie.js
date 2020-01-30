import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';

const UpdateForm = (props) => {
    const [ editMovie, setEditMovie ] = useState({
        title:'',
        director: '',
        metascore: '',
        stars: [],
        id: '',
    });
    const { id } = useParams();
    useEffect(() => {
        Axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(res => {
                console.log('edit movie res', res);
                setEditMovie(res.data);
            })
            .catch(err => console.log(err))
    },[id])

    const handleChanges = (e) => {
        setEditMovie({
            ...editMovie,
            [e.target.name]: e.target.value
        })
    };
    const handleStarChanges = (e) => {
        setEditMovie({
            ...editMovie,
            stars: editMovie.stars.map((star) => {
                if(e.target.name === star){
                    return e.target.value
                } else {
                    return star
                }
            })
        })
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(editMovie)
        Axios
            .put(`http://localhost:5000/api/movies/${editMovie.id}`, editMovie)
            .then(res => {
                console.log('edit was submitted', res)
                props.history.push(`/`)
            })
            .catch(err => {
                console.log('could not submit edit', err)
            })
    };
    return(
        <div>
            <form onSubmit={handleSubmit}>

                <div>
                    <label>Title</label>
                    <input 
                    type='text'
                    name='title'
                    onChange={handleChanges}
                    value={editMovie.title}/>
                </div>

                <div>
                    <label>Director</label>
                    <input 
                    type='text'
                    name='title'
                    onChange={handleChanges}
                    value={editMovie.director}/>
                </div>

                <div>
                    <label>Metascore</label>
                    <input 
                    type='text'
                    name='title'
                    onChange={handleChanges}
                    value={editMovie.metascore}/>
                </div>

                <div>
                    <label>Actors</label>
                    {editMovie.stars.map((actor, i) => {
                        return <input 
                            type='text'
                            name={actor}
                            onChange={handleStarChanges}
                            value={actor}
                            key={i}/>
                    })}
                </div>
                    <button>submit!</button>
            </form>
        </div>
    )
};

export default UpdateForm;