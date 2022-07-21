import axios from 'axios';
import Image from 'next/image';
import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import Logo from '/public/logo.png';
import Molecula from '/public/molecule.png';
import video from '/public/videoIMG.mp4';
const App = () => {
  const [data, setData] = useState(' ');

  return (
    <>
      <div className='lector'>
        <QrReader
          onResult={(result, error) => {
            if (!!result) {
              setData(result?.text);
              axios({
                method: 'POST',
                url: 'http://localhost:3000/api/asistencia',
                data: {
                  name: result?.text,
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
        />
      </div>
      <div className='pantalla'>
        <video
          id='bgVideo'
          autoPlay
          loop
          muted
          src={video}
        />

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
