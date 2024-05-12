import moment from 'moment';

export const replaceEmptyStringWithNull = (obj: any): any => {
  if (obj == null) {
    return obj;
  }

  if (obj instanceof Date) {
    return moment(obj).format();
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => replaceEmptyStringWithNull(item));
  }

  if (typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [key, replaceEmptyStringWithNull(value)]),
    );
  }

  if (typeof obj === 'string' && obj.trim() === '') {
    return null;
  }

  return obj;
};
