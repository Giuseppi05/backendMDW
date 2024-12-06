import yup from 'yup';

export const offerSchema = yup.object().shape({
  title: yup
    .string()
    .required("El título es obligatorio"),

  description: yup
    .string()
    .required("La descripción es obligatoria"),

  discount: yup
    .number()
    .required("El descuento es obligatorio")
    .min(0, "El descuento no puede ser menor a 0")
    .max(100, "El descuento no puede ser mayor a 100"),

  restaurant: yup.object().shape({
    id: yup
      .string()
      .required("El ID del restaurante es obligatorio"),

    name: yup
      .string()
  }),

  startDate: yup
    .date()
    .required("La fecha de inicio es obligatoria")
    .typeError("La fecha de inicio debe ser válida"),

  endDate: yup
    .date()
    .required("La fecha de fin es obligatoria")
    .typeError("La fecha de fin debe ser válida")
    .min(yup.ref('startDate'), "La fecha de fin debe ser posterior a la fecha de inicio"),
});