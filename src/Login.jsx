import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from './AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')
  const {user, logIn} = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    try{
      await logIn(email, password)
      navigate('/netflix')
    } catch(error) {
      console.log(error);
      setError(error.message)
    }
  }

  return (
    <>
    <div className='w-full h-screen'>
      <img className='hidden sm:block absolute w-full h-full object-cover' src='https://assets.nflxext.com/ffe/siteui/vlv3/b321426e-35ae-4661-b899-d63bca17648a/8ad9e9f9-b386-4068-a360-d270e14f7d34/KR-ko-20220926-popsignuptwoweeks-perspective_alpha_website_large.jpg' alt='/' />
      <div className='bg-black/60 fixed top-0 left-0 w-full h-screen'></div>
      <div className='fixed w-full px-4 py-24 z-50'>
        <div className='max-w-[450px] h-[600px] mx-auto bg-black/75 text-white'>
          <div className='max-w-[320px] mx-auto py-16'>
            <h1 className='text-3xl font-bold'>로그인</h1>
            {error ? <p className='p-3 bg-red-400 my-2'>{error}</p> : null}
            <form onSubmit={handleSubmit} className='w-full flex flex-col py-4'>
              <input onChange={(e) => setEmail(e.target.value)} className='p-3 my-2 bg-gray-700 rounded' type="email" placeholder='이메일 주소' autoComplete='email' />
              <input onChange={(e) => setPassword(e.target.value)} className='p-3 my-2 bg-gray-700 rounded' type="password"  placeholder='비밀번호' autoComplete='current-password' />
              <button className='bg-red-600 py-3 my-6 rounded font-bold'>로그인</button>
              <div className='flex justify-between items-center text-sm text-gray-600'>
                <p><input className='mr-2' type="checkbox" />로그인 정보 저장</p>
                <p>도움이 필요하신가요?</p>
              </div>
              <p className='py-8'><span className='text-gray-600'>Netflix 회원이 아닌가요? </span>
              {' '}
              <Link to='/signup'> 지금 가입하세요.</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default Login