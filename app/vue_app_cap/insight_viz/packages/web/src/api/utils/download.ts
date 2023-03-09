// 下载文件
export const download = (res: any, file_name?: string) => {
  if (!res.data) {
    return;
  }
  const data = res.data;
  // 设置下载文件名称，使用正则取出名称
  const pat = new RegExp('(?<=filename=).*');
  let contentDisposition = '';
  //浏览器问题可能会出现 content-disposition 匹配不到
  if (res.headers['content-disposition']) contentDisposition = res.headers['content-disposition'];
  if (res.headers['Content-Disposition']) contentDisposition = res.headers['Content-Disposition'];
  const result = pat.exec(contentDisposition);
  let fileName = file_name || (result && result[0]);
  if (!fileName) {
    fileName = 'file.zip';
  } else {
    fileName = decodeURIComponent(fileName);
  }

  const url = window.URL.createObjectURL(new Blob([data]));
  const tempLink = document.createElement('a');
  tempLink.style.display = 'none';
  tempLink.href = url;
  tempLink.setAttribute('download', fileName);
  // 兼容：某些浏览器不支持HTML5的download属性
  if (typeof tempLink.download === 'undefined') {
    tempLink.setAttribute('target', '_blank');
  }
  document.body.appendChild(tempLink);
  tempLink.click();
  document.body.removeChild(tempLink);
  // 释放blob URL地址
  window.URL.revokeObjectURL(url);
};
