// // Utility to transform FieldErrors to the required type
// const transformErrors = (fieldErrors: typeof FieldErrors) => {
//     return Object.keys(fieldErrors || {}).reduce((acc, key) => {
//       acc[key] = Array.isArray(fieldErrors[key]) ? fieldErrors[key] : [fieldErrors[key] as string];
//       return acc;
//     }, {} as Record<string, string[] | undefined>);
//   };
  