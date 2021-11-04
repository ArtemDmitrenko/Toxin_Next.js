const validate = (text: string) => (value: string) => (value ? undefined : text);

export default validate;
