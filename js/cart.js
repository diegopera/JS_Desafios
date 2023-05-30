const loginStatus = sessionStorage.getItem("loginSucc");
if (loginStatus){
  username = sessionStorage.getItem("username")
  const loginName = document.getElementById("loginRegister").innerText = `${username}`;
};

