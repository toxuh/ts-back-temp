import settings from '../config';

const URL = (subUrl: string): string =>
  `/api/v${settings.apiSettings.version}/${subUrl}`;

export default URL;
