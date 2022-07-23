import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import Logo from '/public/logo.png';
import Molecula from '/public/molecule.png';
import video from '/public/videoIMG.mp4';
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
            setData('gracias'); //gracias
            setTimeout(() => {
              setData(' ');
            }, 1000);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }, 1000);
    return () => clearTimeout(delayDebounceFN);
  }, [data]);

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
            defaultValue='Untitled'
            className='input-lector'
          />
        </div>
        {/* <QrReader
          onResult={(result, error) => {
            if (!!result) {
              setData(data?.text);
              axios({
                method: 'POST',
                url: 'http://localhost:3000/api/asistencia',
                data: {
                  name: data?.text,
                  date: new Date().toLocaleString(),
                },
              }).then((res) => {
                console.log(res);
              }).catch((err) => {
                console.log(err);
              })
              setTimeout(() => {
                setData(' ');
              }, 3000);
            }

            if (!!error) {
              console.info(error);
            }
          }}
          style={{
            display: 'none',
          }}
        /> */}
      </div>
      <div className='pantalla'>
        <video id='bgVideo' autoPlay loop muted src={video} />

        <div className='contenedor'>
          <Image src={Logo} className='logo' alt='logo' />
          <div className='textos'>
            <h1>¡BIENVENIDO!</h1>
            <p className='nombre'>{data}</p>
          </div>
          <Image
            src={Molecula}
            width='10vh'
            height='10vh'
            className='molecula'
            alt='logo'
          />
        </div>
      </div>
    </>
  );
};

export default App;
