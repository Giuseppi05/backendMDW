import yup from 'yup';

export const userSchema = yup.object({
    name: yup
        .string()
        .required("El nombre es obligatorio"),

    lastname: yup
        .string()
        .required("El apellido es obligatorio"),
    
    age: yup
        .number()
        .required("La edad es obligatoria")
        .positive("La edad debe ser un número positivo")
        .min(15, "La edad mínima es 15")
        .max(99, "La edad máxima es 99"),

    email: yup
        .string()
        .email("Ingrese un correo electrónico valido")
        .required("El correo es obligatorio"),

    district: yup
        .string()
        .required("El distrito es obligatorio"),
    
    address: yup
        .string()
        .required("La dirección es obligatoria"),
});
