import { notification } from 'antd';

export default class Message {
  static success(arg) {
    notification.success({
      message: arg,
      description: '',
    });
  }

  static error(arg) {
    notification.error({
      message: arg,
      description: '',
    });
  }
}
