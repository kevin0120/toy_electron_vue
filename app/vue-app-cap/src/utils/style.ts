// 拧紧结果使用徽章的css样式
export function getBadgeStyle(status: string): string {
  let badgeClassName = '';
  switch (status) {
    case 'ok':
    case 'nok':
    case 'ak2':
    case 'none':
    case 'lsn':
    case 'doing':
    case 'ready':
    case 'failed':
      badgeClassName = 'customer-badge';
      break;
    default:
      badgeClassName = '';
      break;
  }
  return badgeClassName;
}
