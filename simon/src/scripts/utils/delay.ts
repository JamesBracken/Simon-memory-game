// Functions

/** This function creates & returns a promise after a param specified delay.
 * 
 *@param ms - Milliseconds of delay for the function to use  
 *@returns A promise which resolves after a the specified delay
**/
export const delay = (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
}