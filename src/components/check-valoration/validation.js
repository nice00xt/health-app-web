import * as Yup from 'yup';

export const validations = Yup.object().shape({
  res1: false,
  res2: '',
  res3: Yup.string().required('required'),
  res4: Yup.string().required('required'),
  res5: Yup.string().required('required'),
  res6: Yup.string().required('required'),
  res7: Yup.string().required('required'),
});

export const questions = [
  { name: 'res1', text: 'Siente fatiga, palpitaciones o ahogo con cualquier actividad fisica?' },
  { name: 'res2', text: 'Tiene hinchazon de las piernas?' },
  { name: 'res3', text: 'Siente fatiga, palpitaciones o ahogo estando sentado?' },
  { name: 'res4', text: 'Ha perdido la conciencia?' },
  { name: 'res5', text: 'Siente dolor en el pecho?' },
  { name: 'res6', text: 'Se siente triste, deprimido o deseperanzado?' },
  { name: 'res7', text: 'Ha perdido el interés o el placer en su vida?' },
]

export const initialValues = {
  res1: false,
  res2: false,
  res3: false,
  res4: false,
  res5: false,
  res6: false,
  res7: false,
}