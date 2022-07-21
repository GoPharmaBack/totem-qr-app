import { Schema, model, models } from 'mongoose';

const AsistenciaSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'The Asistencia name is required '],
      trim: true,
    },
    date: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default models.AsistenciaModel ||
  model('AsistenciaModel', AsistenciaSchema);
