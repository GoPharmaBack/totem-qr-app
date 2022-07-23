import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import Logo from '/public/logo.png';
import Molecula from '/public/molecule.png';
import video from '/public/videoIMG.mp4';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import Head from 'next/head';
const App = () => {
  const [data, setData] = useState(' ');
  const QrinputRef = useRef();

  useEffect(() => {
    if (QrinputRef.current) {
      QrinputRef.current.focus();
    }
    const delayDebounceFN = setTimeout(() => {
      console.log(data);
      if (data !== ' ') {
        axios({
          method: 'POST',
          url: 'http://localhost:3000/api/asistencia',
          data: {
            name: data,
            date: new Date().toLocaleString(),
          },
        })
          .then((res) => {
            console.log(res);
            setData('Gracias...'); //gracias
            setTimeout(() => {
              setData(' ');
            }, 2000);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }, 1000);
    return () => clearTimeout(delayDebounceFN);
  }, [data]);

  const particlesInit = async (main) => {
    console.log(main);

    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(main);
  };

  const particlesLoaded = (container) => {
    console.log(container);
  };

  return (
    <>
      <div className='lector'>
        <div className='lector-form'>
          <input
            type='text'
            name='name'
            placeholder='Leer qr'
            autoComplete='off'
            ref={QrinputRef}
            onChange={(e) => setData(e.target.value)}
            autoFocus
            value={data}
            className='input-lector'
          />
        </div>
      </div>
      <div className='pantalla'>
        <video id='bgVideo' autoPlay loop muted src={video} />
        <Particles
          id='tsparticles'
          init={particlesInit}
          loaded={particlesLoaded}
          options={{
            background: {
              color: {
                value: 'transparent',
              },
            },
            fpsLimit: 120,
            interactivity: {
              events: {
                onClick: {
                  enable: true,
                  mode: 'push',
                },
                onHover: {
                  enable: true,
                  mode: 'repulse',
                },
                resize: true,
              },
              modes: {
                push: {
                  quantity: 4,
                },
                repulse: {
                  distance: 200,
                  duration: 0.4,
                },
              },
            },
            particles: {
              color: {
                value: '#ffffff',
                opacity: 0.2,
              },
              links: {
                enable: false,
              },
              collisions: {
                enable: true,
              },
              move: {
                direction: 'none',
                enable: true,
                outModes: {
                  default: 'bounce',
                },
                random: false,
                speed: 1,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                },
                value: 80,
              },
              opacity: {
                value: 0.2,
              },
              shape: {
                type: 'circle',
              },
              size: {
                value: { min: 1, max: 5 },
              },
            },
            detectRetina: true,
          }}
        />
        <div className='contenedor'>
          <Image
            src={Logo}
            className='logo'
            alt='logo'
          
          />
          <div className='textos'>
            <h1>¡BIENVENIDO!</h1>
            <p className='nombre'>{data}</p>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default App;
