import yup from 'yup';

export const incidentSchema = yup.object({
    title: yup
        .string()
        .required("El título es obligatorio"),

    date: yup
        .date()
        .required("La fecha es obligatoria"),

    description: yup
        .string()
        .required("La descripción es obligatoria"),
});
