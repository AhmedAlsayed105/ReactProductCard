
/**
 * 
 * @param {string } text => the input text 
 * @param {number } max => max length before
 * @returns =>slice text
 */

export function textSlice(text: string, max :number = 50)
{
    // console.log(text.length );
    // console.log(`${text.slice(0,max)}...`);
    
    return text.length >=  max ? `${text.slice(0,max)}...`  : text
}