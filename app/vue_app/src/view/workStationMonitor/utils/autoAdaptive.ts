export const echartfontSize = (res: number) => {
  // let docEl: HTMLDivElement | null = document.documentElement,
  const clientWidth: number = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  if (!clientWidth) return;
  const fontSize: number = 100 * (clientWidth / 1920);
  //  console.log(res * fontSize, 'res * fontSize')
  return res * fontSize;
};
