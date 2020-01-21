import React, { useState } from 'react';
import { Spinner } from './loadingSpinner.component';
export const useSpinner = () => {
    const [ isLoading, setIsLoading ] = useState(false);
    const LoadingIndicator = isLoading && <Spinner />;
    return { LoadingIndicator, isLoading, setIsLoading }
}