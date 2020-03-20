import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  heartRate: Yup.string().required('required'),
  bloodPressure: Yup.string().required('required'),
  weight: Yup.string().required('required')
});

// export const questions = [
//   { name: 'res1', text: 'Siente fatiga, palpitaciones o ahogo con cualquier actividad fisica?' },
//   { name: 'res2', text: 'Tiene hinchazon de las piernas?' },
//   { name: 'res3', text: 'Siente fatiga, palpitaciones o ahogo estando sentado?' },
//   { name: 'res4', text: 'Ha perdido la conciencia?' },
//   { name: 'res5', text: 'Siente dolor en el pecho?' },
//   { name: 'res6', text: 'Se siente triste, deprimido o deseperanzado?' },
//   { name: 'res7', text: 'Ha perdido el interés o el placer en su vida?' },
// ]

export const initialValues = {
  heartRate: '',
  bloodPressure: '',
  weight: ''
}