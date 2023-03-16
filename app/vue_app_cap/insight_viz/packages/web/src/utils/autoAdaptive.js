export const echartfontSize = (res) => {
    // let docEl: HTMLDivElement | null = document.documentElement,
    const clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (!clientWidth)
        return;
    const fontSize = 100 * (clientWidth / 1920);
    //  console.log(res * fontSize, 'res * fontSize')
    return res * fontSize;
};
