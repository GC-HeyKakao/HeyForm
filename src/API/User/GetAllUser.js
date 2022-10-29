import axios from 'axios';
import { PostUser } from './PostUser';

const GetAllUser = async () => {
  // /user/

  // 모든 유저 정보 가져오기
  const response = await axios.get('http://210.109.60.38:8080/user')
    .catch((error) => {
      console.log(error)
    })

  let Users = JSON.stringify(response.data); 
  return Users;
  
}

export { GetAllUser };