// Clears every localStorage key that holds session/account data entered by the user.
// Used anywhere "Log out" is triggered (ProfilePage, Navbar mobile menu) so the
// two can't drift out of sync the way the button styles did.
export const clearSession = () => {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('loginToken');
  localStorage.removeItem('loginEmail');
  localStorage.removeItem('loginPhone');
  localStorage.removeItem('loginCountry');
  localStorage.removeItem('loginFirstName');
  localStorage.removeItem('loginLastName');
  localStorage.removeItem('loginAddress');
  localStorage.removeItem('loginCity');
  localStorage.removeItem('loginState');
  localStorage.removeItem('loginZip');
  localStorage.removeItem('profileData');
  localStorage.removeItem('cards');
};
