import React from 'react';
import { cities } from '../../cities';
import './Cities.scss';

const Citites = (props) => {

    return (
        <div className='cities-list'>
            {cities.map((city) => {
                return (
                    <a key={city.id} className={"city " + (props.currentCity === city.id ? 'active' : '')} 
                        href='#'
                        onClick={() => {
                            props.onChange(city.id);
                        }}
                    >
                        {city.title}
                    </a>
                );
            })}
        </div>
    );
}

export default Citites;
