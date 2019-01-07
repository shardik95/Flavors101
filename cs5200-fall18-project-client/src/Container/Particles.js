import React from 'react';
import Particles from 'react-particles-js';
import image from '../assets/burger.png';

class ParticlesBg extends React.Component
{
    constructor(){
        super()
    }

    render() {
        return (
            <div>
            <Particles
                params={parameters}
                />
            </div>
        )
    }
}


const parameters = {
    "particles": {
        "number": {
            "value": 150
        },
        "size": {
            "value": 15
        },
        "line_linked":{
          "color":"#000000"
        },
        "shape": {
            "type": ["image"],
            "stroke": {
                "width": 0,
                "color": "#000000"
            },
            "polygon": {
                "nb_sides": 4
            },
            "image": {
                "src": image,
                "width": 100,
                "height": 100
            },
            "images": []
        },
    },
    "interactivity": {
        "events": {
            "onhover": {
                "enable": true,
                    "mode": "repulse"
            }
        }
    }

}

export default ParticlesBg