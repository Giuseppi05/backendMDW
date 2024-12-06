import yup from 'yup'

export const authSchema = yup.object({
    email: yup
        .string()
        .email("Ingrese un correo electrónico valido")
        .required("El correo es obligatorio"),
    password: yup
        .string()
        .min(8, "La contraseña debe tener al menos 8 caractéres.")
        .matches(/\d/, "La contraseña debe incluir al menos un número.")
        .required("La contraseña es obligatoria"),
})