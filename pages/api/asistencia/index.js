import Asistencia from 'models/Asistencia.models';
import { dbConnect } from 'config/mongoose';
dbConnect();

export default async function handler(req, res) {
  const { method, body } = req;
  switch (method) {
    case 'GET':
      try {
        console.log(req.method, req.url);
        const Asistencias = await Asistencia.find().sort({ points: -1 });
        res.status(200).json(Asistencias);
      } catch (error) {
        console.log(error);
      }

      break;
    case 'POST':
      try {
        console.log(body);
        const NewAsistencia = new Asistencia(body);
        const SavedAsistencia = await NewAsistencia.save();
        res.status(200).json(SavedAsistencia, 'Registrando Asistencia');
        
      } catch (error) {
        console.log(error);
      }
      break;
    default:
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
