import yup from 'yup';

export const matchSchema = yup.object().shape({

  user: yup.object().shape({
    id: yup
      .string()
      .required("El ID del usuario es obligatorio"),

    name: yup
      .string()
  }),

  restaurant: yup.object().shape({
    id: yup
      .string()
      .required("El ID del restaurante es obligatorio"),

    name: yup
      .string()
  }),
});