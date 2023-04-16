import React from 'react';
import './Cities.scss';

const Citites = (props) => {
    const cities = [
        {
            id: 1,
            title: "Город1"
        },
        {
            id: 2,
            title: "Город2"
        },
        {
            id: 3,
            title: "Город3"
        },
    ]

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
