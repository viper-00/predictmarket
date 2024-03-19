import axios from 'axios';

export class Http {
  static httpPath = 'http://127.0.0.1:8888/api/';
  // static httpPath = 'https://api.predictmarket.xyz/api/';

  // test
  static test = this.httpPath + 'client/test';

  static userRegister = this.httpPath + 'client/register';
  static userVerifyInvitation = this.httpPath + 'client/verify-invitation';
  static userLogin = this.httpPath + 'client/login';
  static userLoginByCode = this.httpPath + 'client/login-by-code';
  static userProfile = this.httpPath + 'client/user-profile';

  // user
  static userSetting = this.httpPath + 'client/user/user-setting';
  static userNotificationSetting = this.httpPath + 'client/user/user-notification-setting';
  static userAffiliate = this.httpPath + 'client/user/user-affiliate';
  static userNotification = this.httpPath + 'client/user/user-notification';
  static userBalance = this.httpPath + 'client/user/user-balance';

  // event
  static marketEvent = this.httpPath + 'client/event/market-event';
  static marketEventPlay = this.httpPath + 'client/event/market-event-play';
  static marketEventType = this.httpPath + 'client/event/market-event-type';

  // order
  static marketEventOrder = this.httpPath + 'client/event/order/market-event-order';
  static marketEventOrderSettle = this.httpPath + 'client/event/order/market-event-order-settle';

  // comment
  static marketEventComment = this.httpPath + 'client/event/comment/market-event-comment';

  // like
  static marketEventCommentLike = this.httpPath + 'client/event/comment/like/market-event-comment-like';

  // upload
  static fileUpload = this.httpPath + 'client/upload/uploadFile';
}
