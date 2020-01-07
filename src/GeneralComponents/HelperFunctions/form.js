import { useState } from 'react';
export const useFormInput = (value) => {
    const [state, setState] = useState(value ? value : '');
    const onChange = (event) => {
        const { target: { value } } = event;
        setState(value);
    }
    const handleFile = (value) => {
        setState(value)
    }
    const resetValue = () => setState('');
    return { state, onChange, handleFile, resetValue }
}