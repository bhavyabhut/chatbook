import React, { useEffect } from 'react'
import firebase from 'firebase'
import { auth } from '../config/firebase'
import { useAuth } from '../provider'
import { useHistory } from 'react-router-dom'
import style from './login.module.css'
import styled from 'styled-components'

import { ReactComponent as Logo1 } from '../image/upDraw/undraw_Bookmarks_re_mq1u.svg'
import { ReactComponent as Logo2 } from '../image/upDraw/undraw_Connected_re_lmq2.svg'
import { ReactComponent as Logo3 } from '../image/upDraw/undraw_Like_dislike_re_dwcj.svg'
import { ReactComponent as Logo4 } from '../image/upDraw/undraw_Sign_in_re_o58h.svg'
import { ReactComponent as Logo5 } from '../image/upDraw/undraw_Social_growth_re_tjy9.svg'
import { ReactComponent as Logo6 } from '../image/upDraw/undraw_Traveling_re_weve.svg'
import { ReactComponent as Logo7 } from '../image/upDraw/undraw_Video_streaming_re_v3qg.svg'
import { ReactComponent as Logo8 } from '../image/upDraw/undraw_well_done_i2wr.svg'

const Wrapper = styled.div`
  @media only screen and (max-width: 399px) {
    width: 10%;
  }
`

const BtnFacebook = styled.button`
  width: 165px;
  height: 35px;
  border-radius: 4px;
  background: #3b5998;
  color: white;
  border: 0px transparent;
  text-align: center;
  margin: 5px;
  display: inline-block;

  &:hover {
    background: #3b5998;
    opacity: 0.6;
    cursor: pointer;
  }
`
const BtnGoogle = styled.button`
  margin: 5px;
  width: 165px;
  height: 35px;
  border-radius: 4px;
  background: #db3236;
  color: white;
  border: 0px transparent;
  text-align: center;

  &:hover {
    background: #db3236;
    opacity: 0.6;
    cursor: pointer;
  }
`
function Landing() {
  const user = useAuth()
  const history = useHistory()

  useEffect(() => {
    if (user) history.push('/chats')
  }, [user])

  return (
    <div className={style.loginPage}>
      <div className={style.loginImage}>
        <Logo5 className={style.loginLogo} />
        <Logo6 className={style.loginLogo} />
        <Logo7 className={style.loginLogo} />
        <Logo8 className={style.loginLogo} />
      </div>
      <div className={style.loginInput}>
        <div className={style.loginNameBox}>
          {/* <strong style={{ marginBottom: "0.5rem" }}>Name :</strong> */}
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <Wrapper>
              <BtnFacebook
                onClick={() => {
                  auth
                    .signInWithPopup(new firebase.auth.FacebookAuthProvider())
                    .then((data) => console.log('user', data))
                }}
              >
                &nbsp;&nbsp;Sign In with Facebook
              </BtnFacebook>
              <BtnGoogle
                onClick={() => {
                  auth
                    .signInWithPopup(new firebase.auth.GoogleAuthProvider())
                    .then((data) => console.log('user', data))
                }}
              >
                &nbsp;&nbsp;Sign In with Google
              </BtnGoogle>
            </Wrapper>
          </div>
        </div>
      </div>
      <div className={style.loginImage}>
        <Logo1 className={style.loginLogo} />
        <Logo2 className={style.loginLogo} />
        <Logo3 className={style.loginLogo} />
        <Logo4 className={style.loginLogo} />
      </div>
    </div>
  )
}

export default Landing
