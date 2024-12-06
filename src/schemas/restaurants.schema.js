import yup from 'yup';

export const restaurantSchema = yup.object({
    name: yup
        .string()
        .required("El nombre es obligatorio"),

    type: yup
        .string()
        .required("El tipo es obligatorio"),

    district: yup
        .string()
        .required("El distrito es obligatorio"),
    
    address: yup
        .string()
        .required("La dirección es obligatoria"),

    qualification: yup
        .number()
        .required("La calificación es obligatoria")
        .positive("La calificación debe ser un número positivo")
        .min(0, "La calificación mínima es 0")
        .max(5, "La calificación máxima es 5"),

    averagePrice: yup
        .number()
        .required("El precio promedio es obligatorio")
        .min(0, "El precio promedio mínimo es 0")
        .positive("El precio promedio debe ser un número positivo"),
        
    mainCourse: yup
        .string()
        .required("El plato principal es obligatorio"),
        
    description: yup
        .string()
        .required("La descripción es obligatoria"),
});
