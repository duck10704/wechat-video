import globals from './globals';

export default  {
  ...globals,
  bcb: {
    circles: 'https://bcb.perfectcorp.com/v2/circle/list-circle-by-user.action',
    posts: 'https://bcb.perfectcorp.com/v2/post/listUserPost.action',
    fbfanpage: 'https://bcb.perfectcorp.com//v2/user/create-fan-page-user.action',
    managetab: 'https://bcb.perfectcorp.com/v2/user/update-user-tab.action',
    profile: 'https://bcb.perfectcorp.com/v2/user/editCurrentUser.action'
  },
  bcw: {
    businessTermsOfServices: 'https://www.beautycircle.com/info/business-terms-of-service.action',
    agreement: 'https://www.beautycircle.com/info/agreement.action',
    forgetPassword: 'https://www.beautycircle.com/user/forgot-password',
    profile: 'https://www.beautycircle.com/profile/'
  }
}
