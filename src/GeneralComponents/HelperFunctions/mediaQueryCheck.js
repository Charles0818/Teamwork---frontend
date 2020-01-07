export const widthIsMatch = (width) => window.matchMedia(`(max-width:${width})`).matches;
// widthIsMatch.addEventListener('resize', ()=> widthIsMatch.matches);