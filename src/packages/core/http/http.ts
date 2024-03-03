import axios from 'axios';

export class Http {
  static httpPath = 'http://127.0.0.1:8888/api/';

  // test
  static test = this.httpPath + 'client/test';

  static userRegister = this.httpPath + 'client/register';
  static userVerifyInvitation = this.httpPath + 'client/verify-invitation';
  static userLogin = this.httpPath + 'client/login';

  // user
  static userInfo = this.httpPath + 'client/user/user-info';
  static userSetting = this.httpPath + 'client/user/user-setting';
  static userNotificationSetting = this.httpPath + 'client/user/user-notification-setting';
  static userAffiliate = this.httpPath + 'client/user/user-affiliate';
  static userNotification = this.httpPath + 'client/user/user-notification';
  static userBalance = this.httpPath + 'client/user/user-balance';

  // event
  static marketEvent = this.httpPath + 'client/event/market-event';
  static marketEventPlay = this.httpPath + 'client/event/market-event-play';

  // comment
  static marketEventComment = this.httpPath + 'client/event/comment/market-event-comment';

  // like
  static marketEventCommentLike = this.httpPath + 'client/event/comment/like/market-event-comment-like';

  // upload
  static fileUpload = this.httpPath + 'client/upload';
}
