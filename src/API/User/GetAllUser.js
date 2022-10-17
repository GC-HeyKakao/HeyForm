import axios from 'axios';

const GetAllUser = async () => {
  // /user/

  const data = {
    account: localStorage.getItem('token'),
    age: parseInt(localStorage.getItem('age')),
    email: localStorage.getItem('email'),
    id: parseInt(localStorage.getItem('id')),
    name: localStorage.getItem('name'),
  };
  const headers = {
    Authorization: localStorage.getItem('token')
  };

  // 모든 유저 정보 가져오기
  const response = await axios.get('http://210.109.61.98:8080/user')
    .catch((error) => {
      console.log(error)
    })
    
  let Users = JSON.stringify(response.data);
  console.log(Users);

  return Users;

}

export { GetAllUser };