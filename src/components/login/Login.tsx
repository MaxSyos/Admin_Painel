import React, { useContext, useEffect, useRef } from "react";
import axios from "axios";
import LoginContext from "../../store/loginContext";
import langContextObj from "../../store/langContext";
import { images } from "../../constants";
import Input from "../UI/input/Input";
import Button from "../UI/button/Button";
import { useTranslation } from "react-i18next";
import classes from "./Login.module.scss";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


import { useLoginMutation } from '../../slices/usersApiSlice.js';
import { setCredentials } from '../../slices/authSlice.js';
import { toast } from 'react-toastify';
import { BASE_URL, USERS_URL } from "../../constantURLs";
import LoadingSpinner from "../UI/loadingSpinner/LoadingSpinner";

function LoginBox() {
  const loginCtx = useContext(LoginContext);
  const langCtx = useContext(langContextObj);
  const userNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const errorMessageRef = useRef<HTMLSpanElement>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();



  const dispatch = useDispatch();


  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state: any) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo?.data?.isAdmin) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);
  
  async function loginHandler(e: React.FormEvent) {
    e.preventDefault();
    //const url = `${BASE_URL}${USERS_URL}/auth`;
    try {
      const email = userNameRef?.current?.value;
      const password = passwordRef?.current?.value;
      const res = await login({ email, password });
      dispatch(setCredentials({ ...res }));
      /* loginCtx.toggleLogin(); */
      navigate(redirect);
      /* const response = await axios.post(url, {
        email: userNameRef.current?.value,
        password: passwordRef.current?.value,
      });
      if (res.status === 200 && res.data.isAdmin === true) {
        loginCtx.toggleLogin();
        navigate(redirect);
      } */
    } catch (error) {
      toast.error(error?.data?.message || error);
      userNameRef.current?.focus();
      passwordRef.current?.focus();
      errorMessageRef.current?.setAttribute(
        "style",
        "display: inline-block;opacity: 1"
      );
    }
  }

  return (
    <div
      className={`${classes.container} ${
        langCtx.lang === "fa" ? classes.rtl : ""
      }`}
    >
      <div className={classes.loginBox}>
        <div className={classes.logo}>
          <img src={images.logo} alt="digikala" />
        </div>
        <h2 className={classes.title}>{t("loginPage")}</h2>
        <form onSubmit={loginHandler}>
          <Input
            ref={userNameRef}
            type={"email"}
            id={"E-mail"}
            placeholder={"admin"}
          />
          <span ref={errorMessageRef} className={classes.errorMessage}>
            {t("errorMessage")}
          </span>
          <Input
            ref={passwordRef}
            type={"password"}
            id={"Senha"}

          />
          {isLoading && <LoadingSpinner/>}
          <Button type="submit">{t("login")}</Button>
          <Link className={classes.forgat_pass} to="/">
            {t("forgetPass")}
          </Link>
          <div className={classes.checkbox}>
            <input type="checkbox" id="rememberMe" />
            <label htmlFor="rememberMe">{t("rememberMe")}</label>
          </div>
        </form>
      </div>

      <div className={classes.keyPic}>
        <img
          src={require("../../assets/images/Revenue-cuate.svg").default}
          alt="illustrator key"
        />
      </div>
    </div>
  );
}

export default LoginBox;