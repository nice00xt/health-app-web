import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  res1: Yup.string().required('required'),
  res2: Yup.string().required('required'),
  res3: Yup.string().required('required'),
  res4: Yup.string().required('required'),
});

export const validationSchemaSecond = Yup.object().shape({
  res1: Yup.string().required('required'),
  res2: Yup.string().required('required'),
  res3: Yup.string().required('required'),
  res4: Yup.string().required('required'),
  res5: Yup.string().required('required'),
});

export const questions = [
  { name: 'res1', text: '1. ¿Se ha sentido con poca energía?' },
  { name: 'res2', text: '2. ¿Ha perdido usted el interés por las cosas?' },
  { name: 'res3', text: '3. ¿Ha perdido la confianza en sí mismo?' },
  { name: 'res4', text: '4. ¿Se ha sentido usted desesperanzado, sin esperanzas?' },
]

export const questionsSecond = [
  { name: 'res1', text: '5. ¿Ha tenido dificultades para concentrarse?' },
  { name: 'res2', text: '6. ¿Ha perdido peso? (a causa de su falta de apetito)' },
  { name: 'res3', text: '7. Se ha estado despertando demasiado temprano?' },
  { name: 'res4', text: '8. ¿Se ha sentido usted enlentecido?' },
  { name: 'res5', text: '9. ¿Cree usted que ha tenido tendencia a encontrarse peor por las mañanas?' },
]

export const initialValues = {
  res1: false,
  res2: false,
  res3: false,
  res4: false,
}

export const initialValuesSecond = {
  res1: false,
  res2: false,
  res3: false,
  res4: false,
  res5: false,
}